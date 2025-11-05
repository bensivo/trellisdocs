import faker
import requests
from requests.auth import HTTPBasicAuth
import json

fake = faker.Faker()

if __name__ == '__main__':
    for _ in range(10):
        res = requests.post(
            url = 'http://localhost:8000/api/documents',
            headers={
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }, 
            data=json.dumps({
                'name': ' '.join(fake.words(2)),
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
                        'value': fake.name()
                    },
                ],
                'content_fields': [
                    {
                        'name': 'Summary',
                        'type': 'text',
                        'value': fake.sentence()
                    },
                    {
                        'name': 'Priority',
                        'type': 'text',
                        'value': fake.random_choices(['P1', 'P2', 'P3'], length=1)[0]
                    },
                    {
                        'name': 'Description',
                        'type': 'text',
                        'value': fake.paragraph()
                    },
                ]
            })
        )

        print(json.dumps(res.json(), indent=2))