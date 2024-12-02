import requests

def test_listings():
    print("\nTesting Listings Endpoint:")
    response = requests.get("http://127.0.0.1:8000/listings/")
    if response.status_code == 200:
        print("Listings fetched successfully:")
        for listing in response.json():
            print(listing)
    else:
        print(f"Error fetching listings: {response.status_code}")
        try:
            error_detail = response.json()
            print(f"Error message: {error_detail}")
        except:
            print(f"Raw error response: {response.text}")

def test_reservations():
    print("\nTesting Reservations Endpoint:")
    response = requests.get("http://127.0.0.1:8000/reservations/")
    if response.status_code == 200:
        print("Reservations fetched successfully:")
        for listing_group in response.json():
            print(f"\nListing ID: {listing_group['listing_id']}")
            for reservation in listing_group['reservations']:
                print(f"  Reservation ID: {reservation['id']}")
                # print(f"  Guest: {reservation['guest_first_name']} {reservation['guest_last_name']}")
                # print(f"  Check-in: {reservation['check_in_at']}")
                # print(f"  Check-out: {reservation['check_out_at']}")
                print(f"  Channel: {reservation['channel']}")
                print("  " + "-" * 40)
    else:
        print(f"Error fetching reservations: {response.status_code}")
        try:
            error_detail = response.json()
            print(f"Error message: {error_detail}")
        except:
            print(f"Raw error response: {response.text}")

if __name__ == "__main__":
    # test_listings()
    test_reservations()