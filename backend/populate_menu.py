import os
import django

# Set Django settings module (adjust to 'restaurant.settings' if needed)
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'restaurant.settings')
django.setup()

# Import models after setup
from api.models import MenuItem

def populate_menu():
    menu_items = [
        {
            'name': 'Hummus',
            'description': 'Creamy chickpea dip with tahini and lemon.',
            'price': 6.99,
            'category': 'Food',
            'image_url': 'https://images.unsplash.com/photo-1611168858053-1fd2e3e95135'
        },
        {
            'name': 'Falafel',
            'description': 'Crispy fried chickpea balls served with tahini.',
            'price': 8.99,
            'category': 'Food',
            'image_url': 'https://images.unsplash.com/photo-1590933606443-56c65f4a88a2'
        },
        {
            'name': 'Shawarma',
            'description': 'Marinated chicken wrapped in pita bread.',
            'price': 12.99,
            'category': 'Food',
            'image_url': 'https://images.unsplash.com/photo-1585238341710-4d3e1f18d7d8'
        },
        {
            'name': 'Baklava',
            'description': 'Sweet pastry with nuts and honey syrup.',
            'price': 4.99,
            'category': 'Food',
            'image_url': 'https://images.unsplash.com/photo-1612198188060-4e2a1b799e0e'
        },
        {
            'name': 'Mint Tea',
            'description': 'Refreshing Moroccan mint tea.',
            'price': 3.99,
            'category': 'Drink',
            'image_url': 'https://images.unsplash.com/photo-1571931468392-36056c9b0f34'
        },
        {
            'name': 'Ayran',
            'description': 'Cool yogurt-based drink.',
            'price': 2.99,
            'category': 'Drink',
            'image_url': 'https://images.unsplash.com/photo-1596111938882-4c5e5a6a9631'
        },
    ]
    MenuItem.objects.all().delete()  # Clear existing items (optional)
    for item in menu_items:
        MenuItem.objects.create(**item)
    print("Menu items populated successfully!")

if __name__ == '__main__':
    populate_menu()