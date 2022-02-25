from sanic import Sanic, response
from sanic_cors import CORS
from sanic.views import HTTPMethodView
from sanic_scheduler import SanicScheduler, task 
from datetime import  time, timedelta

from getVideos import get_all_video
from db import __addData__, __addSub__, __readData__, __readItem__, __removeSub__

app = Sanic("ScraperApp")
scheduler = SanicScheduler(app)
CORS(app)

@task(timedelta(hours=12), time(hour=12, minute=0))
async def update_data(_):
    get_all_video()


class ListView(HTTPMethodView):
    async def get(self, request):
        return response.json({"data":__readData__()})

class ItemView(HTTPMethodView):
    async def get(self, request, id):
        return response.json({"data":__readItem__(id)})

    async def post(self, request, id):
        payload = request.body.decode('UTF-8')
        __addSub__(id, payload)
        return response.text("Added")
    
    async def delete(self, request, id ):
        __addSub__(id, None)
        return response.text("Removed")

app.add_route(ListView.as_view(), '/')
app.add_route(ItemView.as_view(), '/<id>')


app.run(port=80)