from django.conf.urls import patterns, url

from context_client import views

urlpatterns = patterns('',
	url(r'^(?P<path>.*)$', 'django.views.static.serve', {'document_root': '/home/djangotest/lab/context_client/html/'})
)

