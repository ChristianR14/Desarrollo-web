import webapp2
from google.appengine.api import users
from google.appengine.ext import ndb
from google.appengine.api import app_identity
from google.appengine.api import images
from google.appengine.ext import blobstore
import cloudstorage
import mimetypes
import json
import os
import jinja2

from models import Empresa
from models import Tweet
from models import Client
from models import Instructor

jinja_env = jinja2.Environment(
 loader=jinja2.FileSystemLoader(os.path.dirname(__file__)))


class DemoClass(object):
 pass

def MyClass(obj):
 return obj.__dict__


class GetTweetsHandler(webapp2.RequestHandler):

    def get(self):
     self.response.headers.add_header('Access-Control-Allow-Origin', '*')
     self.response.headers['Content-Type'] = 'application/json'

     id_empresa = self.request.get('empresa')
     objemp = Empresa.query(Empresa.codigo_empresa == id_empresa).get()
     strKey = objemp.key.urlsafe() 
     myEmpKey = ndb.Key(urlsafe=strKey) 
     myTweets = Tweet.query(Tweet.empresa_key == myEmpKey)

     myList = []
     for i in myTweets:
      myObj = DemoClass()
      myObj.id = i.key.urlsafe()
      myObj.title = i.title
      myObj.description = i.description
      myObj.urlImage = i.urlImage
      myList.append(myObj)
       
     json_string = json.dumps(myList, default=MyClass)
     self.response.write(json_string)



class GetClientsHandler(webapp2.RequestHandler):

    def get(self):
     self.response.headers.add_header('Access-Control-Allow-Origin', '*')
     self.response.headers['Content-Type'] = 'application/json'

     id_user = self.request.get('empresa')
     objemp = Empresa.query(Empresa.codigo_empresa == id_user).get()
     strKey = objemp.key.urlsafe() 
     myEmpKey = ndb.Key(urlsafe=strKey) 
     myClients = Client.query()

     myList = []
     for i in myClients:
      myObj = DemoClass()
      myObj.id = i.key.urlsafe()
      myObj.name = i.name
      myObj.lastname = i.lastname
      myObj.age = i.age
      myObj.pago = i.pago
      myObj.sport = i.sport
      myObj.urlImage = i.urlImage
      myList.append(myObj)
       
     json_string = json.dumps(myList, default=MyClass)
     self.response.write(json_string)


class InstructorHandler(webapp2.RequestHandler):

   def get(self):

    template_context = {}
    self.response.out.write(
      self._render_template('instructor.html', template_context))

   def _render_template(self, template_name, context=None):
    if context is None:
     context = {}

    template = jinja_env.get_template(template_name)
    return template.render(context)  


class GetInstructorsHandler(webapp2.RequestHandler):

    def get(self):
     self.response.headers.add_header('Access-Control-Allow-Origin', '*')
     self.response.headers['Content-Type'] = 'application/json'

     id_user = self.request.get('empresa')
     objemp = Empresa.query(Empresa.codigo_empresa == id_user).get()
     strKey = objemp.key.urlsafe() 
     myEmpKey = ndb.Key(urlsafe=strKey) 
     myInstructors = Instructor.query()

     myList = []
     for i in myInstructors:
      myObj = DemoClass()
      myObj.id = i.key.urlsafe()
      myObj.name = i.name
      myObj.lastname = i.lastname
      myObj.age = i.age
      myObj.sport = i.sport
      myObj.urlImage = i.urlImage
      myList.append(myObj)
       
     json_string = json.dumps(myList, default=MyClass)
     self.response.write(json_string)


class addInstructorHandler(webapp2.RequestHandler):

   def get(self):

    template_context = {}
    self.response.out.write(
      self._render_template('addInstructor.html', template_context))

   def _render_template(self, template_name, context=None):
    if context is None:
     context = {}

    template = jinja_env.get_template(template_name)
    return template.render(context)



###########################################################################     


class UpHandler(webapp2.RequestHandler):
    def _get_urls_for(self, file_name):
        
     bucket_name = app_identity.get_default_gcs_bucket_name()
     path = os.path.join('/', bucket_name, file_name)
     real_path = '/gs' + path
     key = blobstore.create_gs_key(real_path)
     try:
      url = images.get_serving_url(key, size=0)
     except images.TransformationError, images.NotImageError:
      url = "http://storage.googleapis.com{}".format(path)

     return url


    def post(self):
     self.response.headers.add_header('Access-Control-Allow-Origin', '*')
     self.response.headers['Content-Type'] = 'application/json'

     bucket_name = app_identity.get_default_gcs_bucket_name()
     uploaded_file = self.request.POST.get('uploaded_file')
     file_name = getattr(uploaded_file, 'filename', None)
     file_content = getattr(uploaded_file, 'file', None)
     real_path = ''

     if file_name and file_content:
      content_t = mimetypes.guess_type(file_name)[0]
      real_path = os.path.join('/', bucket_name, file_name)

      with cloudstorage.open(real_path, 'w', content_type=content_t,
       options={'x-goog-acl': 'public-read'}) as f:
       f.write(file_content.read())

      key = self._get_urls_for(file_name)
      self.response.write(key)


class LoginHandler(webapp2.RequestHandler):

   def get(self):

    template_context = {}
    self.response.out.write(
      self._render_template('login.html', template_context))

   def _render_template(self, template_name, context=None):
    if context is None:
     context = {}

    template = jinja_env.get_template(template_name)
    return template.render(context)


class addClientHandler(webapp2.RequestHandler):

   def get(self):

    template_context = {}
    self.response.out.write(
      self._render_template('addClient.html', template_context))

   def _render_template(self, template_name, context=None):
    if context is None:
     context = {}

    template = jinja_env.get_template(template_name)
    return template.render(context)

class addTweetHandler(webapp2.RequestHandler):

   def get(self):

    template_context = {}
    self.response.out.write(
      self._render_template('addTweet.html', template_context))

   def _render_template(self, template_name, context=None):
    if context is None:
     context = {}

    template = jinja_env.get_template(template_name)
    return template.render(context)

class ClientHandler(webapp2.RequestHandler):

   def get(self):

    template_context = {}
    self.response.out.write(
      self._render_template('client.html', template_context))

   def _render_template(self, template_name, context=None):
    if context is None:
     context = {}

    template = jinja_env.get_template(template_name)
    return template.render(context)    
  

class TweetHandler(webapp2.RequestHandler):

   def get(self):

    template_context = {}
    self.response.out.write(
      self._render_template('routine.html', template_context))

   def _render_template(self, template_name, context=None):
    if context is None:
     context = {}

    template = jinja_env.get_template(template_name)
    return template.render(context)


class MainHandler(webapp2.RequestHandler):

   def get(self):

    template_context = {}
    self.response.out.write(
      self._render_template('index.html', template_context))


   def _render_template(self, template_name, context=None):
    if context is None:
     context = {}

    template = jinja_env.get_template(template_name)
    return template.render(context)

class UpdateClientHandler(webapp2.RequestHandler):

   def get(self):

    template_context = {}
    self.response.out.write(
      self._render_template('updateClient.html', template_context))

   def _render_template(self, template_name, context=None):
    if context is None:
     context = {}

    template = jinja_env.get_template(template_name)
    return template.render(context)



class SuperUserHandler(webapp2.RequestHandler):

   def get(self):

    template_context = {}
    self.response.out.write(
      self._render_template('options.html', template_context))


   def _render_template(self, template_name, context=None):
    if context is None:
     context = {}

    template = jinja_env.get_template(template_name)
    return template.render(context) 

class UpdateInstructorHandler(webapp2.RequestHandler):

   def get(self):

    template_context = {}
    self.response.out.write(
      self._render_template('updateInstructor.html', template_context))

   def _render_template(self, template_name, context=None):
    if context is None:
     context = {}

    template = jinja_env.get_template(template_name)
    return template.render(context)



class addUserHandler(webapp2.RequestHandler):

   def get(self):

    template_context = {}
    self.response.out.write(
      self._render_template('addUser.html', template_context))


   def _render_template(self, template_name, context=None):
    if context is None:
     context = {}

    template = jinja_env.get_template(template_name)
    return template.render(context)        

app = webapp2.WSGIApplication([
    ('/', MainHandler),
    ('/login', LoginHandler),
    ('/addUser', addUserHandler),
    ('/clients', ClientHandler),
    ('/instructors', InstructorHandler),
    ('/updateClient', UpdateClientHandler),
    ('/updateInstructor', UpdateInstructorHandler),
    ('/addClient', addClientHandler),
    ('/addRoutine', addTweetHandler),
    ('/addInstructor', addInstructorHandler),
    ('/routines', TweetHandler),
    ('/up', UpHandler),
    ('/options', SuperUserHandler),
    ('/gettweets', GetTweetsHandler),
    ('/getinstructors', GetInstructorsHandler),
    ('/getclients', GetClientsHandler),
], debug = True)
