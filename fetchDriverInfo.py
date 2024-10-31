import requests
import json


def fetch_all_drivers():
    drivers = []
    limit = 100
    offset = 0
    total = 1

    while offset < total:
        url = f"https://ergast.com/api/f1/drivers.json?limit={limit}&offset={offset}"
        response = requests.get(url)
        if response.status_code != 200:
            print(f"Failed to fetch data: {response.status_code}")
            break

        data = response.json()
        driver_data = data["MRData"]["DriverTable"]["Drivers"]
        drivers.extend(driver_data)

        total = int(data["MRData"]["total"])
        offset += limit
        print(f"Fetched {offset} of {total} drivers...")

    return drivers


def organize_drivers_by_country(drivers):
    country_drivers = {}
    for driver in drivers:
        nationality = driver.get("nationality", "Unknown")
        driver_info = {
            "driverId": driver.get("driverId"),
            "givenName": driver.get("givenName"),
            "familyName": driver.get("familyName"),
            "dateOfBirth": driver.get("dateOfBirth"),
            "url": driver.get("url"),
        }

        if nationality not in country_drivers:
            country_drivers[nationality] = []
        country_drivers[nationality].append(driver_info)

    return country_drivers


def save_to_json(data, filename="drivers_by_country.json"):
    with open(filename, "w") as f:
        json.dump(data, f, indent=2)
    print(f"Data saved to {filename}")


def main():
    print("Fetching all drivers from the Ergast API...")
    drivers = fetch_all_drivers()
    print(f"Total drivers fetched: {len(drivers)}")

    print("Organizing drivers by nationality...")
    country_drivers = organize_drivers_by_country(drivers)

    print("Saving data to JSON file...")
    save_to_json(country_drivers)


if __name__ == "__main__":
    main()
