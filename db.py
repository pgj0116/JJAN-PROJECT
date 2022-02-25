from sqlalchemy import create_engine, Column, String, Integer
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base


mysql_url = "mysql+pymysql://admin:1q2w3e4r@jjandb.crllgrnso5zn.ap-northeast-2.rds.amazonaws.com:3306/jjandb"
engine = create_engine(mysql_url, echo=True)

Session= sessionmaker(bind=engine)
session = Session()
Base = declarative_base()

class YoutubeList(Base):
    __tablename__='youtubelist'

    id = Column(Integer, primary_key=True)
    title= Column(String(50))
    sub = Column(String(50))
    url =Column(String(50))
    publishedAt =Column(String(50))

# Base.metadata.create_all(engine)
def __addData__(new_data):
    datas = session.query(YoutubeList)
    for data in datas:
        if new_data.url==data.url:
            return 
    session.add(new_data)
    session.commit()
    session.close()
    return
      

def __addSub__(Id, New_Sub):
    data = session.query(YoutubeList).filter(YoutubeList.id==Id).first()
    data.sub = New_Sub
    session.commit()
    session.close()  

def __removeSub__(Id):  
    data = session.query(YoutubeList).filter(YoutubeList.id==Id).first()
    print("From RemoveSub", data)
    session.close()  


def __readData__():
    datas = session.query(YoutubeList) 
    result = []
    for data in datas:
        result.append({"id":data.id,"title":data.title, "sub":data.sub, "url":data.url, "publishedAt":data.publishedAt})
    session.close()
    return result

def __readItem__(Id):
    data = session.query(YoutubeList).filter(YoutubeList.id==Id).first()
    result={"title":data.title, "sub":data.sub, "url":data.url, "publishedAt":data.publishedAt}
    session.close()
    return result


