import base64
import Crypto
from Crypto.Hash import SHA256
from google.appengine.ext import ndb
from google.appengine.ext import blobstore
from protorpc import remote
from endpoints_proto_datastore.ndb import EndpointsModel
import endpoints
from google.appengine.api import mail
from google.appengine.ext.webapp import blobstore_handlers

class CustomBaseModel(EndpointsModel):
    def populate(self, data):
        super(self.__class__, self).__init__()
        for attr in self._message_fields_schema:
            if hasattr(data, attr):
                setattr(self, attr, getattr(data, attr))

## empresa
class Empresa(CustomBaseModel):
    _message_fields_schema = ('entityKey', 'codigo_empresa', 'nombre_empresa')
    codigo_empresa = ndb.StringProperty()
    nombre_empresa = ndb.StringProperty()
    
       ###Empresa####
    def empresa_m(self, data):
        empresa = Empresa()#Crea una variable de tipo Base de datos
        empresa.populate(data)#Llena la variables con los datos dados por el request en main.py
        #empresa.empresa_key=empresakey #inserta el entityKey de la empresa que es un parametro que se manda en main.py
        empresa.put()#inserta o hace un update depende del main.py
        return 0



#####USUARIOS#########

class Usuarios(CustomBaseModel):
    _message_fields_schema = ('entityKey', 'email', 'password', 'salt')

    empresa_key = ndb.KeyProperty(kind=Empresa)
    email = ndb.StringProperty()
    password = ndb.StringProperty()
    salt = ndb.StringProperty(indexed=False)
   
 
    def hash_password(self):
        """ Create a cryptographyc random secure salt and hash the password
            using the salt created and store both in the database, the password
            and the salt """
        # Note: It is needed to encode in base64 the salt, otherwise it will
        # cause an exception trying to store non utf-8 characteres
        self.salt = base64.urlsafe_b64encode(
            Crypto.Random.get_random_bytes(16))
        hash_helper = SHA256.new()
        hash_helper.update(self.password + self.salt)
        self.password = hash_helper.hexdigest()

    def verify_password(self, password):
        """ Verify if the password is correct """
        hash_helper = SHA256.new()
        hash_helper.update(password + self.salt)
        return hash_helper.hexdigest() == self.password

       ###Usuarios####
    def usuario_m(self, data, empresakey):
        user = Usuarios()#Crea una variable de tipo Base de datos
        user.populate(data)#Llena la variables con los datos dados por el request en main.py
        user.empresa_key=empresakey
        user.status=1
        user.hash_password()#encripta la contrasena
        user.put()#inserta o hace un update depende del main.py
        return 0


######### Tweets #########

class Tweet(CustomBaseModel):
    _message_fields_schema = ('entityKey', 'title', 'description', 'urlImage')
    empresa_key = ndb.KeyProperty(kind=Empresa)
    title = ndb.StringProperty()
    description = ndb.StringProperty()
    urlImage = ndb.StringProperty()
 
    ### Tweet ####
    def tweet_m(self, data, empresakey):
        tweet  = Tweet()#Crea una variable de tipo Tweet
        tweet.populate(data)#Llena la variables con los datos dados por el request en main.py
        tweet.empresa_key=empresakey#inserta el entityKey de la empresa que es un parametro que se manda en main.py
        tweet.put()#inserta o hace un update depende del main.py
        return 0


######### Products #########

class Product(CustomBaseModel):
    _message_fields_schema = ('entityKey', 'code', 'description', 'urlImage')
    user_key = ndb.KeyProperty(kind=Usuarios)
    code = ndb.StringProperty()
    description = ndb.StringProperty()
    urlImage = ndb.StringProperty()
 
    ### add Product ####
    def product_m(self, data, userkey):
        product  = Product()#Crea una variable de tipo Tweet
        product.populate(data)#Llena la variables con los datos dados por el request en main.py
        product.user_key=userkey#inserta el entityKey de la empresa que es un parametro que se manda en main.py
        product.put()#inserta o hace un update depende del main.py
        return 0        



######### Clients #########

class Client(CustomBaseModel):
    _message_fields_schema = ('entityKey', 'name', 'lastname', 'age', 'pago', 'sport', 'urlImage')
    user_key = ndb.KeyProperty(kind=Usuarios)
    name = ndb.StringProperty()
    lastname = ndb.StringProperty()
    age = ndb.StringProperty()
    pago = ndb.StringProperty()
    sport = ndb.StringProperty()
    urlImage = ndb.StringProperty()
 
    ### add Product ####
    def client_m(self, data, userkey):
        client  = Client()#Crea una variable de tipo Tweet
        client.populate(data)#Llena la variables con los datos dados por el request en main.py
        client.user_key=userkey#inserta el entityKey de la empresa que es un parametro que se manda en main.py
        client.put()#inserta o hace un update depende del main.py
        return 0        

######### Instructor #########

class Instructor(CustomBaseModel):
    _message_fields_schema = ('entityKey', 'name', 'lastname', 'age', 'sport', 'urlImage')
    user_key = ndb.KeyProperty(kind=Usuarios)
    name = ndb.StringProperty()
    lastname = ndb.StringProperty()
    age = ndb.StringProperty()
    sport = ndb.StringProperty()
    urlImage = ndb.StringProperty()
 
    ### add Product ####
    def instructor_m(self, data, userkey):
        instructor  = Instructor()#Crea una variable de tipo Tweet
        instructor.populate(data)#Llena la variables con los datos dados por el request en main.py
        instructor.user_key=userkey#inserta el entityKey de la empresa que es un parametro que se manda en main.py
        instructor.put()#inserta o hace un update depende del main.py
        return 0        



#### create demo

def validarEmail(email):
    emailv = Usuarios.query(Usuarios.email == email)
    if not emailv.get():
        return False
    else:
        return True

#### create root Empresa
"""
if validarEmail("adsoft@kubeet.com") == False:
    empresaAdmin = Empresa(
      codigo_empresa = 'kubeet',
      nombre_empresa="kubeet srl de cv",
    )
    empresaAdmin.put()


#### create root user  

    keyadmincol = ndb.Key(urlsafe=empresaAdmin.entityKey)
    admin = Usuarios(
          empresa_key = keyadmincol,
          email="adsoft@kubeet.com",
          password="qubit",
       
    )
    admin.hash_password()
    admin.put()

"""