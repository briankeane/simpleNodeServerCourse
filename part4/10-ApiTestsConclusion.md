# API Tests

Ok -- so that was painful but now everything is working again and we have confidence that it's really working the way we think it is, because we have good unit tests and good api (integration) tests.

One thing to notice is that we spent a lot of time correcting 'id' in our tests... we probably spent more time changing the tests than changing the app code.  That's not "normal" -- it means our tests are "brittle" and easily broken.  In the next section we'll shore up our tests so that future large changes won't be so difficult.