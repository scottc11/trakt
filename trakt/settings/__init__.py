import os

# if os.getenv('GAE_INSTANCE'):
if os.environ.get('IS_HEROKU', None):
    from .prod import *
else:
    from .dev import *
