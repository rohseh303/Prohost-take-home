import requests

response = requests.get("http://127.0.0.1:8000/listings/")
if response.status_code == 200:
    print("First listing fetched successfully:")
    print(response.json()[0])
else:
    print(f"Error: {response.status_code}")