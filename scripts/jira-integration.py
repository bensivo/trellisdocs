import requests
from requests.auth import HTTPBasicAuth
import json

jira_email='replaceme'
jira_api_token='replaceme'
jira_base_url='replaceme'


def fetch_jira_tickets(project_key: str, fields: list[str]):
    """
    Fetch and return Jira tickets in the given project, returning the given fields

    See: https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-search/#api-rest-api-3-search-jql-post for details

    :param project_key str: Jira project key, usually all upper-case letters.
    :param fields list[str]: List of jira fields to extract. Use the special case '*all' to return everything.

    :return: list of dicts, the jira tickets
    """
    issues = []

    next_page_token = None
    while True:
        response = requests.post(
            url = f'https://bensivo.atlassian.net/rest/api/3/search/jql',
            headers={
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            auth=HTTPBasicAuth(
                username=jira_email,
                password=jira_api_token,
            ),
            data=json.dumps({
                'fields': fields,
                'jql': f'project = "{project_key}" ORDER BY created DESC',  # TODO: Add created_date filter in function
                'nextPageToken': next_page_token,
                'maxResults': 50,
            })
        )

        res_json = response.json()
        issues.extend(res_json['issues'])
        if res_json['isLast'] == True:
            break
        else:
            next_page_token = res_json['nextPageToken']

    return issues


if __name__ == '__main__':
    tickets = fetch_jira_tickets(
        project_key='TREL',
        fields=[
                'id',
                'description',
                'summary', 
                'created',
                'updated',
                'reporter',
                'priority',
                'status',
                'comment'
        ]
    )
    print(json.dumps(tickets, indent=2))

    for ticket in tickets:
        id = ticket['id']
        summary = ticket['fields']['summary']
        description = ticket.get('fields.description', '')
        created = ticket['fields']['created']
        reporter = ticket['fields']['reporter']['displayName']
        priority = ticket['fields']['priority']['name']
        status = ticket['fields']['status']['name']

        res = requests.post(
            url = 'http://localhost:8000/api/documents',
            headers={
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }, 
            data=json.dumps({
                'name': f"{id} - {summary}",
                'property_fields': [
                    {
                        'name': 'Created At',
                        'type': 'text',
                        'value': created
                    },
                    {
                        'name': 'Reporter',
                        'type': 'text',
                        'value': reporter
                    },
                ],
                'content_fields': [
                    {
                        'name': 'Summary',
                        'type': 'text',
                        'value': summary
                    },
                    {
                        'name': 'Priority',
                        'type': 'text',
                        'value': priority
                    },
                    {
                        'name': 'Status',
                        'type': 'text',
                        'value': status
                    },
                    {
                        'name': 'Description',
                        'type': 'text',
                        'value': description
                    },
                ]
            })
        )

        print(json.dumps(res.json(), indent=2))