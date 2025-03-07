import requests
import os
import jwt
import json


HUDDLE01_API_KEY = os.environ['HUDDLE01_API_KEY']

SDK_VERSION = "1.0.0"  # Define your SDK version
MAX_METADATA_SIZE = 5 * 1024  # 5KB limit for metadata
DEFAULT_PERMISSIONS = {
    "canConsume": False,
    "canProduce": False,
    "canRecvData": False,
    "canSendData": False,
    "canUpdateMetadata": False
}

ROLE_PERMISSIONS = {
    "SPEAKER": {
        "canConsume": True,
        "canProduce": True,
        "canRecvData": True,
        "canSendData": True,
        "canUpdateMetadata": True
    }
}

def estimate_size(data):
    return len(json.dumps(data).encode("utf-8"))

class AccessToken:
    def __init__(self, data):
        if not data.get("roomId"):
            raise ValueError("roomId required")

        self.apiKey = HUDDLE01_API_KEY
        self.roomId = data["roomId"]
        self.metadata = data.get("options", {}).get("metadata")

        if self.metadata and estimate_size(self.metadata) > MAX_METADATA_SIZE:
            raise ValueError("Metadata size exceeds the limit of 5KB")

        self.options = {
            "ttl": data.get("options", {}).get("ttl", "4h"),
            "maxPeersAllowed": data.get("options", {}).get("maxPeersAllowed")
        }

        if self.options["maxPeersAllowed"] is not None:
            if not isinstance(self.options["maxPeersAllowed"], int) or self.options["maxPeersAllowed"] <= 0:
                raise ValueError("maxPeersAllowed must be a positive number")

        self.role = data.get("role")
        self.permissions = data.get("permissions", {})

        if self.role:
            if self.role in ROLE_PERMISSIONS:
                self.permissions = {**ROLE_PERMISSIONS[self.role], **self.permissions}
            elif isinstance(self.role, str) and len(self.role) <= 20:
                self.permissions = {**DEFAULT_PERMISSIONS, **self.permissions}
            else:
                raise ValueError(f"Invalid role: {self.role}. Must provide permissions for custom roles.")

        elif not self.permissions:
            raise ValueError("Either a role or permissions must be provided.")

    def to_jwt(self):
        payload = {
            "roomId": self.roomId,
            "permissions": {**self.permissions, "admin": False},
            "role": self.role,
            "metadata": json.dumps(self.metadata) if self.metadata else ""
        }

        if self.options["maxPeersAllowed"]:
            payload["options"] = {"maxPeersAllowed": self.options["maxPeersAllowed"]}

        headers = {
            "Content-Type": "application/json",
            "x-api-key": self.apiKey,
            "Cache-Control": "no-store, max-age=0",
            "Pragma": "no-cache",
            "x-sdk-version": SDK_VERSION
        }

        response = requests.post(f"https://api.huddle01.com/api/v2/sdk/create-peer-token", json=payload, headers=headers)

        if response.status_code == 401:
            raise ValueError("API key missing or invalid")
        if response.status_code == 404:
            raise ValueError("Room not found associated with the given API key")
        
        # print(response.status_code)
        # print(response.json())

        return response.json().get("token")


# Helper function to create room_id
def create_room():

    url = "https://api.huddle01.com/api/v2/sdk/rooms/create-room"
    headers = {
        "Content-Type": "application/json",
        "x-api-key": HUDDLE01_API_KEY,
    }

    payload = {
        "roomLocked": False,
    }

    try:
        response = requests.post(url, json=payload, headers=headers)

    except Exception as e:
        print("Huddle-01 error: ", e)
        return False, "error"
    
    return response.status_code, response.json()


def create_token(roomId):
    # Example usage:
    access_token = AccessToken({
        "apiKey": HUDDLE01_API_KEY,
        "roomId": roomId,
        "role": "SPEAKER",
        "permissions": {
            "canConsume": True,
            "canProduce": True,
            "canRecvData": True,
            "canSendData": True,
            "canUpdateMetadata": True,
            "canProduceSources": {"cam": True, "mic": True, "screen": True}
        },
        "options": {}
    })

    jwt_token = access_token.to_jwt()
    print(jwt_token)
    return jwt_token
