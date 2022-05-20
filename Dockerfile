FROM python

WORKDIR /main

COPY requirement.txt .

RUN pip install -r requirement.txt

COPY ..  /main/

CMD ["python", "main.py"]

