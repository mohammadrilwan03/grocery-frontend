import requests

urls = [
    "https://images.unsplash.com/photo-1603833665858-e61d17a86271?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1523049673856-42868dd691dd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
]

for url in urls:
    try:
        r = requests.head(url, timeout=5)
        print(f"Status: {r.status_code} for {url[:50]}...")
    except Exception as e:
        print(f"Error for {url[:50]}: {e}")
