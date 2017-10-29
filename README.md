# TRAKT

Website built using Django + React via webpack.


### local sqlite3 db authentication

username: scottcampbell
password: developer password

#### test users
username: John
last_name: Lennon
password: Test123
email: lennon@thebeatles.com

### GitLab Authentication

username: scott.m.campbell11
password: developer password
email: scott.m.campbell11@gmail.com


### File Uploads

https://docs.djangoproject.com/en/1.11/topics/http/file-uploads/


from django.contrib.auth.models import User, Group, Permission
from django.contrib.contenttypes.models import ContentType

content_type = ContentType.objects.get(app_label='myapp', model='BlogPost')
permission = Permission.objects.create(codename='can_publish',
                                       name='Can Publish Posts',
                                       content_type=content_type)
user = User.objects.get(username='duke_nukem')
group = Group.objects.get(name='wizard')
group.permissions.add(permission)
user.groups.add(group)


myuser.groups.set([group_list])
myuser.groups.add(group, group, ...)
myuser.groups.remove(group, group, ...)
myuser.groups.clear()
myuser.user_permissions.set([permission_list])
myuser.user_permissions.add(permission, permission, ...)
myuser.user_permissions.remove(permission, permission, ...)
myuser.user_permissions.clear()
