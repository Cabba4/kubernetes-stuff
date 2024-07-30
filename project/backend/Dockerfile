FROM python:3.10-slim

WORKDIR /workdir

ENV PORT=1234

COPY server.py requirements.txt ./

RUN pip3 install -r requirements.txt

CMD ["python", "server.py"]