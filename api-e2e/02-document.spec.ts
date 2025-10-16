import axios from 'axios';

import "jest";

const baseUrl = 'http://localhost:8000/api';

describe('Documents API', () => {
    it('Create and list docs', async () => {
        let response;
        let numDocsBefore;
        let numDocsAfter;
        let doc;

        // Given: there are n docs
        response = await axios.request({
            method: 'get',
            url: `${baseUrl}/documents`
        })
        numDocsBefore = response.data.length;

        // When: I create a new doc
        response = await axios.request({
            method: 'post',
            url: `${baseUrl}/documents`,
            data: {
                name: 'foobar',
                property_fields: [
                    {
                        name: 'foo',
                        type: 'text',
                        value: 'bar'
                    }
                ],
                content_fields: [
                    {
                        name: 'foo',
                        type: 'text',
                        value: 'bar'
                    }
                ]
            }
        })
        doc = response.data;

        // Then: I get the doc back
        expect(doc).toEqual(expect.objectContaining({
            id: expect.any(Number),
            name: 'foobar',
            property_fields: [
                {
                    id: expect.any(Number),
                    name: 'foo',
                    type: 'text',
                    value: 'bar'
                }
            ],
            content_fields: [
                {
                    id: expect.any(Number),
                    name: 'foo',
                    type: 'text',
                    value: 'bar'
                }
            ]
        }))

        // Then: there are n+1 docs now
        response = await axios.request({
            method: 'get',
            url: `${baseUrl}/documents`
        })
        numDocsAfter = response.data.length;
        expect(numDocsAfter).toEqual(numDocsBefore + 1);
    });

    it('Update a doc', async () => {
        let response;
        let originalDoc;
        let updatedDoc;

        // Given: I create a doc
        response = await axios.request({
            method: 'post',
            url: `${baseUrl}/documents`,
            data: {
                name: 'original-name',
                property_fields: [
                    {
                        name: 'project',
                        type: 'text',
                        value: 'original-project'
                    }
                ],
                content_fields: [
                    {
                        name: 'summary',
                        type: 'text',
                        value: 'original-summary'
                    }
                ]
            }
        });
        originalDoc = response.data;

        // When: I call update, updating name and content_fields
        response = await axios.request({
            method: 'patch',
            url: `${baseUrl}/documents/${originalDoc.id}`,
            data: {
                name: 'updated-name',
                content_fields: [
                    {
                        name: 'summary',
                        type: 'text',
                        value: 'updated-summary'
                    }
                ]
            }
        });
        updatedDoc = response.data;

        // Then: name is changed
        expect(updatedDoc.name).toEqual('updated-name');

        // Then: content_fields is changed
        expect(updatedDoc.content_fields[0].value).toEqual('updated-summary');

        // Then: property_fields is unchanged
        expect(updatedDoc.property_fields[0].value).toEqual('original-project');
    });

    it('Delete a doc', async () => {
        let response;
        let doc;

        // Given: I created a doc
        response = await axios.request({
            method: 'post',
            url: `${baseUrl}/documents`,
            data: {
                name: 'to-delete',
                property_fields: [],
                content_fields: []
            }
        });
        doc = response.data;

        // When: I delete that doc
        await axios.request({
            method: 'delete',
            url: `${baseUrl}/documents/${doc.id}`
        });

        // Then: Trying to get that doc returns 404
        await expect(
            axios.request({
                method: 'get',
                url: `${baseUrl}/documents/${doc.id}`
            })
        ).rejects.toMatchObject({
            response: {
                status: 404
            }
        });
    });
});
