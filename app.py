import os
from flask import Flask,render_template,jsonify
from google.cloud import bigquery

app = Flask(__name__)

@app.route('/')
def hello_world():
    res=query_stackoverflow("google-bigquery")
    return render_template("index.html",items=res)

@app.route('/top10/<string:lang>',methods=['GET'])
def getTop10(lang):
    res=query_stackoverflow(lang)
    return jsonify(results=res)

def query_stackoverflow(lang):
    client = bigquery.Client()
    query_job = client.query("""
        SELECT
          CONCAT(
            'https://stackoverflow.com/questions/',
            CAST(id as STRING)) as url,
            title,
          view_count
        FROM `bigquery-public-data.stackoverflow.posts_questions`
        WHERE tags like '%"""+lang+ """%'
        ORDER BY view_count DESC
        LIMIT 10""")

    results = query_job.result()  # Waits for job to complete.
    table_res=[]
    for row in results:
        #print(row.url)
        dict_tab={}
        dict_tab['url']=row.url
        dict_tab['title']=row.title
        dict_tab['view_count']=row.view_count
        table_res.append(dict_tab)
    #return jsonify(res=table_res) 
    print(table_res)
    return table_res

@app.route('/tags/',methods=['GET'])
def get_tags():
    client = bigquery.Client()
    q=client.query("""
            select tag_name,count from `bigquery-public-data.stackoverflow.tags`
            where count > 10000
            order by count desc
            """)
    results = q.result()
    tab = []
    for row in results:
        #print(row)
        dict_tab={}
        dict_tab['tag']=row.tag_name
        dict_tab['count']=row.count
        tab.append(dict_tab)
    print(tab)
    return jsonify(results=tab)

if __name__ == "__main__":
    app.run(debug=True,host='0.0.0.0',port=int(os.environ.get('PORT', 8080)))
#SELECT L.name, COUNT(1) FROM `bigquery-public-data.github_repos.languages`, UNNEST(language) as L GROUP BY L.name ORDER BY 2 DESC LIMIT 10
