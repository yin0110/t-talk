from flask import jsonify
from database import elastic_search
from model.index_page_model import get_user_info


class elastic_db:
    def put_doc(self, room_id, user, time, history):
        doc = {
            "room_id": room_id,
            "user": user,
            "time": time,
            "history": history
        }

        elastic_search.index(index="history", body=doc)

    def search_related_content(self, room_id, time):
        query = {
            "sort": [{
                "time": {                 # 根據age欄位升序排序
                    "order": "asc"       # asc升序，desc降序
                }
            }],
            "query": {
                "bool": {
                    "must": [
                        {"match": {"room_id":   room_id}}
                    ],
                    "filter": [
                        {"range": {"time": {"gte": time}}}
                    ]
                }
            },
            "from": 0,
            "size": 21
        }

        user = get_user_info()
        history_info = []
        resp = elastic_search.search(index='history', body=query)
        for hit in resp['hits']['hits']:
            info = {"user": hit["_source"]["user"], "time": hit["_source"]
                    ["time"], "history": hit["_source"]["history"]}
            history_info.append(info)
        data = jsonify({"data": history_info, "user": user})
        return data

    def search_earlier_data(self, room_id, time):
        query = {
            "sort": [{
                "time": {                 # 根據age欄位升序排序
                    "order": "desc"       # asc升序，desc降序
                }
            }],
            "query": {
                "bool": {
                    "must": [
                        {"match": {"room_id":   room_id}}
                    ],
                    "filter": [
                        {"range": {"time": {"lt": time}}}
                    ]
                }
            },
            # "from": 0,
            "size": 21,

        }
        user = get_user_info()
        history_info = []
        resp = elastic_search.search(index='history', body=query)
        for hit in resp['hits']['hits']:
            info = {"user": hit["_source"]["user"], "time": hit["_source"]
                    ["time"], "history": hit["_source"]["history"]}
            history_info.append(info)

        def get_time(history_info):
            return history_info["time"]
        history_info.sort(key=get_time)
        data = jsonify({"data": history_info, "user": user})
        return data

    def search_keyword(self, room_id, search_info):
        query = {
            "sort": [{
                "time": {                 # 根據age欄位升序排序
                    "order": "asc"       # asc升序，desc降序
                }
            }],
            'query': {
                "bool": {
                    "must": [
                        {
                            "match": {
                                'room_id': room_id
                            }
                        },
                        {
                            "match_phrase": {
                                'history': search_info
                            }
                        }
                    ]

                }

            }
        }

        user = get_user_info()
        history_info = []
        resp = elastic_search.search(index='history', body=query)
        for hit in resp['hits']['hits']:
            info = {"user": hit["_source"]["user"], "time": hit["_source"]
                    ["time"], "history": hit["_source"]["history"]}
            history_info.append(info)
        data = jsonify({"data": history_info, "user": user})
        return data


elastic_db = elastic_db()
