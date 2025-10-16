from pydantic import BaseModel

class CreatePipelineRequest(BaseModel):
    name: str
    type: str
    cron_string: str
    configs: str

class UpdatePipelineRequest(BaseModel):
    # TODO: Can this be optional?
    name: str
    type: str
    cron_string: str
    configs: str 

class PipelineResponse(BaseModel):
    id: int
    name: str
    type: str
    cron_string: str
    configs: str

class DeletePipelineResponse(BaseModel):
    status: str