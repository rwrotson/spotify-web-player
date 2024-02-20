import os
import pickle
from dataclasses import dataclass, fields
from pathlib import Path

from app.auth.consts import STORAGE_PATH


@dataclass(slots=True)
class Keys:
    state: str | None = None
    access_token: str | None = None
    expires_at: int | None = None
    refresh_token: str | None = None


class _Storage:
    def __init__(self, path: Path):
        self._path = path
        self.keys = Keys()

        self._init_storage_file()
        self._load()

    def _init_storage_file(self) -> None:
        if os.path.exists(self._path):
            return
        
        os.makedirs(
            os.path.dirname(self._path), 
            exist_ok=True,
        )
        with open(STORAGE_PATH, "wb") as file:
            pickle.dump(self.keys, file)


    def _save(self) -> None:
        os.makedirs(
            os.path.dirname(self._path), 
            exist_ok=True,
        )
        with open(STORAGE_PATH, "wb") as file:
            pickle.dump(self.keys, file)

    def _load(self) -> None:
        if os.path.exists(self._path):
            with open(STORAGE_PATH, "rb") as file:
                self.keys: Keys = pickle.load(file)
                return 

        self._init_storage_file()
        self._load()

    def _check_key(self, key: str) -> None:
        if key not in [field.name for field in fields(Keys)]:
            raise KeyError(f"Key {key} not found")
        
    def __getitem__(self, key: str) -> str:
        self._check_key(key)
        self._load()
        return getattr(self.keys, key, None)

    def __setitem__(self, key: str, value: str) -> None:
        self._check_key(key)
        setattr(self.keys, key, value)
        self._save()


storage = _Storage(STORAGE_PATH)
