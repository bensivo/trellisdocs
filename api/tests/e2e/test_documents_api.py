import pytest
import requests

# This is an e2e test, it requires a running instance of the API
@pytest.mark.asyncio
async def test_documents_api():
    # WHEN: I call POST /documents
    res = requests.post('http://localhost:8000/api/documents', json={
        'name': 'foobar', 
        'property_fields': [
            {
                'type': 'text',
                'name': 'foobar',
                'value': 'foobar'
            }
        ],
        'content_fields': []
    })
    assert res.status_code == 200

    # THEN: The response is my document
    body = res.json()
    document_id = body['id']
    assert document_id is not None
    assert body['name'] == 'foobar'
    assert len(body['property_fields']) == 1
    assert len(body['content_fields']) == 0
    
    # WHEN: I call GET documents/:id
    res = requests.get(f'http://localhost:8000/api/documents/{document_id}')
    assert res.status_code == 200

    # THEN: The response is my document
    body = res.json()
    assert body['id'] == document_id
    assert body['name'] == 'foobar'
    
    # WHEN: I call GET /documents
    res = requests.get('http://localhost:8000/api/documents')
    assert res.status_code == 200

    # THEN: I get a list of documents
    body = res.json()
    assert len(body) > 0
    assert any(doc['id'] == document_id for doc in body)
    
    # WHEN: I call PATCH /documents/:id
    res = requests.patch(f'http://localhost:8000/api/documents/{document_id}', json={
        'name': 'foobar-updated',
        'property_fields': [
            {
                'type': 'text',
                'name': 'foobar',
                'value': 'foobar-updated'
            }
        ]
    })
    assert res.status_code == 200

    # THEN: The document is updated
    body = res.json()
    assert body['id'] == document_id
    assert body['name'] == 'foobar-updated'
    assert body['property_fields'][0]['value'] == 'foobar-updated'
    
    # WHEN: I call DELETE /documents/:id
    res = requests.delete(f'http://localhost:8000/api/documents/{document_id}')
    assert res.status_code == 200

    # THEN: The document is deleted
    body = res.json()
    assert body['status'] == 'deleted'
    
    # WHEN: I try to GET the deleted document
    res = requests.get(f'http://localhost:8000/api/documents/{document_id}')

    # THEN: I get a 404
    assert res.status_code == 404

## TODO: Tests for all the edge cases