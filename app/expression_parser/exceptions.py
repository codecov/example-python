from typing import Optional


class ParsingException(Exception):
    def __init__(
        self,
        *args,
        error_index: Optional[int] = None,
        stack_length: Optional[int] = None,
    ) -> None:
        super().__init__(*args)
        self.error_index = error_index
        self.stack_length = stack_length
