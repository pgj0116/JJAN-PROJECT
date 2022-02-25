import requests, json
from db import __addData__, YoutubeList

 
def get_all_video():
    channel_id = 'UCczUZLsHV2wA9NRhwhPZpBw'
    api_key = 'AIzaSyCSWFpGJtrj0OtrT3q7TrocSnDl74ZVVOI'
    base_search_url = 'https://www.googleapis.com/youtube/v3/search?'
    start_url = base_search_url+'key={}&channelId={}&part=snippet,id&order=date&maxResults=25'.format(api_key, channel_id)
    listResult=[]
    url = start_url
    while True:
        resp = requests.get(url).text
        data = json.loads(resp)
        for i in data['items']:
            if i['id']['kind'] == "youtube#video":
                title= i['snippet']['title']
                publishedAt = i['snippet']['publishedAt'].split("T")[0][2:]
                url = f"https://www.youtube.com/embed/{i['id']['videoId']}"
                listResult.append([title,url, publishedAt])
        try:
            next_page_token = data['nextPageToken']
            url = start_url + '&pageToken={}'.format(next_page_token)
       
        except:
            break

    listResult.reverse()
    
    for i in listResult:
        __addData__(YoutubeList(title=i[0],url =i[1], publishedAt=i[2] ))
    return   
    
 

