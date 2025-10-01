from schemas.pipeline_schemas import CreatePipelineRequest, UpdatePipelineRequest, PipelineResponse, DeletePipelineResponse
from typing import Any
from fastapi import APIRouter, Request, Depends, HTTPException
from di import get_pipelines_service
from service.pipelines_svc import PipelineSvc

router = APIRouter()

@router.post("/pipelines")
async def create_pipeline(
    request: Request,
    create_pipeline_request: CreatePipelineRequest,
    pipeline_service: PipelineSvc = Depends(get_pipelines_service)
    ) -> PipelineResponse:

    pipeline = await pipeline_service.create_pipeline(create_pipeline_request)
    return pipeline

@router.get("/pipelines")
async def get_pipelines(
    request: Request,
    pipeline_service: PipelineSvc = Depends(get_pipelines_service)
) -> list[PipelineResponse]:
    pipelines = await pipeline_service.list_pipelines()
    return pipelines

@router.get("/pipelines/{pipeline_id}")
async def get_pipeline(
    pipeline_id: int,
    request: Request,
    pipeline_service: PipelineSvc = Depends(get_pipelines_service)
) -> PipelineResponse:
    pipeline = await pipeline_service.get_pipeline(pipeline_id)
    if pipeline is None:
        raise HTTPException(status_code=404, detail="Pipeline not found")
    return pipeline

@router.patch("/pipelines/{pipeline_id}")
async def update_pipeline(
    pipeline_id: int,
    request: Request,
    update_request: UpdatePipelineRequest,
    pipelines_service: PipelineSvc = Depends(get_pipelines_service)
) -> PipelineResponse:
    pipeline = await pipelines_service.update_pipeline(pipeline_id, update_request)
    if pipeline is None:
        raise HTTPException(status_code=404, detail="Pipeline not found")
    return pipeline

@router.delete("/pipelines/{pipeline_id}")
async def delete_pipeline(
    pipeline_id: int,
    request: Request,
    pipelines_service: PipelineSvc = Depends(get_pipelines_service)
) -> DeletePipelineResponse:
    await pipelines_service.delete_pipeline(pipeline_id)
    return {"status": "deleted"}