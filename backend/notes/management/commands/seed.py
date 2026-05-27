from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from notes.models import Category, Note


class Command(BaseCommand):
    help = 'Seed the database with categories and sample notes'

    def handle(self, *args, **kwargs):
        categories_data = [
            {'name': 'Random Thoughts', 'color': '#F4C2A1', 'border_color': '#E8A87C', 'dot_color': '#E07A5F', 'order': 1},
            {'name': 'School', 'color': '#F9E4B7', 'border_color': '#E8D5A3', 'dot_color': '#F4D35E', 'order': 2},
            {'name': 'Personal', 'color': '#B5D0C5', 'border_color': '#9EBDB0', 'dot_color': '#81B29A', 'order': 3},
            {'name': 'Drama', 'color': '#D4D4AA', 'border_color': '#C2C295', 'dot_color': '#B7B868', 'order': 4},
        ]

        for cat_data in categories_data:
            Category.objects.get_or_create(name=cat_data['name'], defaults=cat_data)

        self.stdout.write(self.style.SUCCESS('Categories created.'))

        # Create demo user if not exists
        user, created = User.objects.get_or_create(username='demo@example.com', defaults={'email': 'demo@example.com'})
        if created:
            user.set_password('demo1234')
            user.save()
            self.stdout.write(self.style.SUCCESS('Demo user created: demo@example.com / demo1234'))

        random_thoughts = Category.objects.get(name='Random Thoughts')
        school = Category.objects.get(name='School')
        personal = Category.objects.get(name='Personal')

        notes_data = [
            {
                'user': user,
                'category': random_thoughts,
                'title': 'Grocery List',
                'content': '• Milk\n• Eggs\n• Bread\n• Bananas\n• Spinach',
            },
            {
                'user': user,
                'category': school,
                'title': 'Meeting with Team',
                'content': 'Discuss project timeline and milestones. Review budget and resource allocation. Address any blockers and plan next steps.',
            },
            {
                'user': user,
                'category': school,
                'title': 'Note Title',
                'content': 'Note content...',
            },
            {
                'user': user,
                'category': random_thoughts,
                'title': 'Vacation Ideas',
                'content': '• Visit Bali for beaches and culture\n• Explore the historic sites in Rome\n• Go hiking in the Swiss Alps\n• Relax in the hot springs of Iceland',
            },
            {
                'user': user,
                'category': personal,
                'title': 'Note Title',
                'content': "Lately, I've been on a quest to discover new books to read. I've come across several recommendations that have piqued my interest. 'The Alchemist' by Paulo Coelho is at the top of my list, given its reputation as a life-changing read. I've also heard great things about 'Educated' by Tara Westover and 'Becoming' by Michelle Obama. Each of thes...",
            },
            {
                'user': user,
                'category': random_thoughts,
                'title': 'A Deep and Contemplative Personal Reflection on the Multifaceted and Ever-Evolving Journey of Life',
                'content': "Life has been a whirlwind of events and emotions lately. I've been juggling work, personal projects, and relationships, often feeling like there aren't enough hours in the day. It's in these moments that I remind myself of the importance of self-care and mindfulness. Work has been particularly demanding with multiple projects running simultaneously. The satisfaction of completing tasks and achieving milestones is immense, but it also comes with its fair share of stress. I've learned to manage my time better, prioritize tasks, and delegate when necessary. It's a continuous learning process. On the personal front, I've been making a conscious effort to reconnect with friends and family. The pandemic taught me the value of relationships and how crucial it is to nurture them. Regular video calls, meetups, and heartfelt conversations have become a part of my routine. I've also taken up new hobbies to unwind and de-stress. Painting has been a therapeutic outlet, allowing me to express my creativity and emotions. Gardening, too, has brought me closer to nature and provided a sense of accomplishment. Looking ahead, I want to focus more on personal growth and development. Reading books, attending workshops, and learning new skills are on my agenda. It's about finding that balance between work and life, ensuring neither overshadows the other. In essence, this period of reflection has been eye-opening. It's about appreciating the present, learning from the past, and being hopeful for the future. Life is a journey, and I'm determined to make the most of it, one day at a time.",
            },
            {
                'user': user,
                'category': school,
                'title': 'Project X Updates',
                'content': 'Finalized design mockups and received approval from stakeholders. Began development on the front-end. Backend integration is scheduled for next week. Team is on track to meet the deadline.',
            },
        ]

        Note.objects.all().delete()
        for note_data in notes_data:
            Note.objects.create(**note_data)

        self.stdout.write(self.style.SUCCESS('Sample notes created.'))
