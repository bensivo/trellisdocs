from dataclasses import dataclass

@dataclass
class Pipeline:
    id: int
    name: str
    type: str
    cron_string: str
    # TODO: is there a way we can make sure its JSON?
    configs: str 