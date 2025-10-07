from model import Pipeline
from schemas.pipeline_schemas import CreatePipelineRequest, UpdatePipelineRequest
from service.db_svc import DBService
from typing import Dict, Any

class PipelineSvc():
        '''
        Handles basic pipeline CRUD operations using database storage
        '''
        def __init__(self, db_svc: DBService):
                self.db_svc = db_svc

        async def create_pipeline(self, request: CreatePipelineRequest) -> Pipeline:
            """
            Create a new pipeline with the provided request data.

            :param request: CreatePipelineRequest object containing pipeline details
            :return: The newly created Pipeline object
            """
            # Insert pipeline record
            pipeline_result = await self.db_svc.query(
                "INSERT INTO pipelines (name, type, cron_string, configs) VALUES ($1, $2, $3, $4) RETURNING id, name, type, cron_string, configs, created_at",
                request.name, 
                request.type,
                request.cron_string, 
                request.configs
            )
            
            pipeline_row = pipeline_result[0]
            pipeline_id = pipeline_row['id']

            return Pipeline(
                id=pipeline_id,
                name=pipeline_row['name'],
                type=pipeline_row['type'],
                cron_string=pipeline_row['cron_string'],
                configs=pipeline_row['configs']
            )

        async def list_pipelines(self) -> list[Pipeline]:
            """
            Retrieve a list of all pipelines.
            TODO: add basic search/filter parameters

            :return: List of Pipeline objects
            """
            pipelines_data = await self.db_svc.query("SELECT id FROM pipelines ORDER BY created_at DESC")
            pipeline_ids = [pipeline['id'] for pipeline in pipelines_data]

            pipelines = []
            for pipeline_id in pipeline_ids:  # TODO: some optimization here would be great, no duplicate call to get the pipeline, and parallelism 
                pipeline = await self.get_pipeline(pipeline_id)
                pipelines.append(pipeline)

            return pipelines

        async def get_pipeline(self, id: int) -> Pipeline | None:
            """
            Retrieve a single pipeline by its ID.

            :param id: The ID of the pipeline to retrieve
            :return: The Pipeline object if found, otherwise None
            """
            pipeline_raw = await self.db_svc.query("SELECT id, name, type, cron_string, configs, created_at FROM pipelines WHERE id = $1", id)
            if not pipeline_raw:
                return None

            return Pipeline(
                id=pipeline_raw[0]['id'],
                name=pipeline_raw[0]['name'],
                type=pipeline_raw[0]['type'],
                cron_string=pipeline_raw[0]['cron_string'],
                configs=pipeline_raw[0]['configs'], 
            )

        async def update_pipeline(self, pipeline_id: int, request: UpdatePipelineRequest) -> Pipeline | None:
            """
            Update a pipeline. Only updates fields that are provided.

            :param pipeline_id: The ID of the pipeline to update
            :param request: UpdatePipelineRequest object containing updated pipeline details
            :return: The updated Pipeline object if found, None if the pipeline does not exist
            """
            # Check if pipeline exists
            existing_pipeline = await self.db_svc.query("SELECT id FROM pipelines WHERE id = $1", pipeline_id)
            if not existing_pipeline:
                return None

            # Update pipeline name if provided
            if request.name is not None:
                await self.db_svc.query("UPDATE pipelines SET name = $1 WHERE id = $2", request.name, pipeline_id)

            return await self.get_pipeline(pipeline_id)

        async def delete_pipeline(self, id: int) -> None:
            """
            Delete a pipeline by its ID.
            :param id: The ID of the pipeline to delete
            """
            await self.db_svc.query("DELETE FROM pipelines WHERE id = $1", id)