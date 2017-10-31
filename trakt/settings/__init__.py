import os

if os.getenv('GAE_INSTANCE'):
    from .prod import *
else:
    from .dev import *
