from fastapi import APIRouter, Request
from schemas.integration_schemas import IntegrationSourceResponse
from typing import List

router = APIRouter()

@router.get("/integration-sources")
async def get_integration_sources(request: Request) -> List[IntegrationSourceResponse]:
    """
    Get available integration sources.
    For now, returns a hardcoded list of supported integrations.
    """
    integration_sources = [
        IntegrationSourceResponse(
            id=1,
            name="Jira",
            description="Fetch from Atlassian Jira",
            available=True
        ),
        IntegrationSourceResponse(
            id=2,
            name="GitHub",
            description="Import from GitHub repositories",
            available=True
        ),
        IntegrationSourceResponse(
            id=3,
            name="Slack",
            description="Capture from Slack channels",
            available=True
        ),
        IntegrationSourceResponse(
            id=4,
            name="Confluence",
            description="Import from Confluence pages",
            available=True
        ),
        IntegrationSourceResponse(
            id=5,
            name="Linear",
            description="Sync from Linear issues",
            available=True
        ),
        IntegrationSourceResponse(
            id=6,
            name="Notion",
            description="Import from Notion databases",
            available=False  # Not yet implemented
        ),
    ]
    
    return integration_sources
