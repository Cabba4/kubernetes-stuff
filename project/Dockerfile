FROM python:3.10-slim

WORKDIR /workdir

ENV PORT=9999

COPY server.py index.html requirements.txt styles.css script.js ./

RUN pip3 install -r requirements.txt

CMD ["python", "server.py"]