import faker
import requests
from requests.auth import HTTPBasicAuth
import json

fake = faker.Faker()

names = []
for _ in range(3):
    names.append(fake.name())

if __name__ == '__main__':
    # Clear all exising documents
    res = requests.get(
        url = 'http://localhost:8000/api/documents',
        headers={
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    )
    documents = res.json()
    for doc in documents:
        res = requests.delete(
            url = f'http://localhost:8000/api/documents/{doc["id"]}',
            headers={
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        )
        print(f'Deleted document {doc["id"]}: {res.status_code}')

    for _ in range(10):
        res = requests.post(
            url = 'http://localhost:8000/api/documents',
            headers={
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }, 
            data=json.dumps({
                'name': ' '.join(fake.words(2)),
                'source': fake.random_choices(['Jira', 'Zendesk', 'ServiceNow'], length=1)[0],
                'property_fields': [
                    {
                        'name': 'Type',
                        'type': 'text',
                        'value': 'Ticket'
                    },
                    {
                        'name': 'Created At',
                        'type': 'text',
                        'value': fake.date()
                    },
                    {
                        'name': 'Reporter',
                        'type': 'text',
                        'value': fake.random_choices(names, length=1)[0]
                    },
                    {
                        'name': 'Priority',
                        'type': 'text',
                        'value': fake.random_choices(['P1', 'P2', 'P3'], length=1)[0]
                    },
                ],
                'content_fields': [
                    {
                        'name': 'Summary',
                        'type': 'text',
                        'value': fake.sentence()
                    },
                    {
                        'name': 'Description',
                        'type': 'text',
                        'value': fake.paragraph()
                    },
                ]
            })
        )

        print(res.content)
        print(json.dumps(res.json(), indent=2))