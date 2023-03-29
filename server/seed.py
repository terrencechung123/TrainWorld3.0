#!/usr/bin/env python3

from random import randint, choice as rc

from faker import Faker

from app import app
from models import db, Ticket, User, Train

fake = Faker()

with app.app_context():

    print("Deleting all records...")
    Ticket.query.delete()
    User.query.delete()
    Train.query.delete()


    fake = Faker()

    print("Creating users...")

    # make sure users have unique usernames
    users = []
    usernames = []
    names = ['Tracy McGrady','Travis Scott','Paris Hilton','Keanu Reeves','Ice Spice','Lebron James','Louis Griffin','Selena Glomez','Short Neck','Long Neck']
    bios = [
        'whats good ya\'ll its tracy mcgrady from the toronto raptors lol.i love train world train world is the best i\'m stuck in trainworld and i cant get out.',
        'It\'s Lit! Believe it Or not I actually Got The Idea of AstroWorld From TrainWorld...TrainWorld Fye. It\'s Lit!',
        'Hi I\'m Paris Hilton and everytime I am not at home with my chihuahua I am sitting first Class in TrainWorld...Believe it or Not my first Selfie was in TrainWorld, and it changed the world forever.',
        'I am Keanu Reeves. I was in the matrix and I am also John Wick. TrainWorld is perfect and I love long rides in TrainWorld.',
        'Wassup Ya\'ll its Ice Spice and you\'re tuning into TrainWorld.  TrainWorld is my go to transporation system, the train system in the US is often overlooked and we should seriously look into the development of our modern railroad systems.',
        'Before the day even started, when I saw TrainWorld I said TrainWorld is probably gonna be the #1 Train Service in America. I don\'t know what made me say that, but when I saw TrainWorld I said it might as well be #1 now.',
        'When I am not at home with my family I am usually daydreaming about finally taking a trip to TrainWorld. TrainWorld has always been my dream as a little girl, and there is nothing I\'d love more than to go to TrainWorld. I\'m stuck in TrainWorld and I can\'t get out.',
        'Hey it\'s Selena Glomez and you\'re browsing TrainWorld! I\'m stuck inside TrainWorld and I can\'t get out! Lol',
        'When I am not busy being a Niche-Internet-Micro-Celebrity, best believe I am taking trips at TrainWorld! I\'m stuck in TrainWorld and I can\'t get out!',
        'What\'s good ya\'ll, It\'s Long Neck. Boy I love TrainWorld, TrainWorld is fye. I\'m stuck in TrainWorld And I can\'t get out.',
    ]
    user_images = [
        'https://cdn.nba.com/headshots/nba/latest/1040x760/1503.png', #Tracy McGrady
        'https://i.pinimg.com/originals/e2/7f/ba/e27fbad0a4e54844f3e6d02cb8fa0d3a.jpg', #Travis Scott
        'https://pbs.twimg.com/media/DGQOPSbUwAAfOq0.jpg', #Paris Hilton
        'https://i.redd.it/o3a9r6vqeu621.jpg', #Keanu Reeves
        'https://www.rollingstone.com/wp-content/uploads/2022/10/ice-spice-ayntk.jpg', #IceSpice
        'https://i.ytimg.com/vi/1zibDYsfDVI/hqdefault.jpg', #Lebron
        'https://i.kym-cdn.com/photos/images/newsfeed/001/488/178/2ef.jpg', #Louis Griffin
        'https://hips.hearstapps.com/hmg-prod/images/selena-gomez-gettyimages-1438544887-640f4584aa9fa.jpg?crop=0.668xw:1.00xh;0.260xw,0&resize=1200:*', #Selena Gomez
        'https://pbs.twimg.com/media/DtDHqbxU4AUdGG0.jpg', #ShortNeck
        'https://i1.sndcdn.com/artworks-000601240600-4d835b-t500x500.jpg', #LongNeck
    ]
    for i in range(10):

        username =names[i]
        while username in usernames:
            username = names[i]
        usernames.append(username)

        user = User(
            username=username,
            bio=bios[i],
            image_url=user_images[i],
        )

        user.password_hash = user.username + 'password'

        users.append(user)

    db.session.add_all(users)

    print("Creating trains...")
    trains = []
    titles = ["The California Zephyr", "The Empire Builder", "The Southwest Chief", "The Coast Starlight", "The Acela Express"]
    train_images = [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgpndFGRh0OdiMPDMfqmBY7T9uj4pOx9rvAL0kgFUQKP4az_WdsBuspvMlRbhS6CxtoAL57BqjI5o&usqp=CAU&ec=48665698",
        "https://montanafreepress.org/wp-content/uploads/2022/02/20220213_AMT_Kootenai0023.jpeg",
        "https://upload.wikimedia.org/wikipedia/commons/0/04/Southwest_Chief_at_Devil%27s_Throne%2C_New_Mexico_%28cropped%29.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3nASehAHzvwriTcwBnjQdhqV-9He9pWLqdEKlazJUn60QZsnW_Bv_jI5mynus9ukqFU85PhZZ3t4&usqp=CAU&ec=48665698",
        "https://www.amtrak.com/content/dam/projects/dotcom/english/public/images/TextwithImage-Horizontal/acela-engine.jpg/_jcr_content/renditions/cq5dam.web.900.548.jpeg"
    ]
    descriptions= [
        "This train runs from Chicago to San Francisco, passing through some of the most scenic parts of the American West, including the Rocky Mountains and Sierra Nevada.",
        "This train travels from Chicago to Seattle or Portland, passing through the northern states of the US, including North Dakota, Montana, and Washington.",
        "This train runs from Chicago to Los Angeles, passing through the southwest region of the US, including New Mexico, Colorado, and Arizona.",
        "This train travels from Seattle to Los Angeles along the scenic Pacific coastline of the US, passing through cities like Portland and San Francisco.",
        "This train is the fastest in the US, running from Boston to Washington D.C. along the Northeast Corridor, with stops in cities like New York and Philadelphia."
        ]
    for i in range(5):
        train = Train(
            title = titles[i],
            description = descriptions[i],
            image_url = train_images[i],
        )
        trains.append(train)
    db.session.add_all(trains)

    print("Creating tickets...")
    tickets = []
    for i in range(10):
        # instructions = fake.paragraph(nb_sentences=8)

        ticket = Ticket(
            price=20,
            # train_title = Ticket.train.title
            )

        ticket.user = rc(users)
        ticket.train = rc(trains)
        tickets.append(ticket)

    db.session.add_all(tickets)

    db.session.commit()
    print("Complete.")


    # for i in range(5):
    #     ticket = Ticket()
    #     ticket.user = rc(users)
    #     tickets.append(ticket)
    # california = Ticket(
    #     price="California",
    #     description=' With its large population and extensive rail network, California is one of the most popular states for train travel in the US. Amtrak\'s Pacific Surfliner, Capitol Corridor, and San Joaquin lines are particularly popular.'
    #     )
    # newyork = Ticket(
    #     price="New York",
    #     description='New York is home to one of the largest and oldest subway systems in the world, as well as several commuter rail systems. Trains are a crucial mode of transportation for the millions of people who live and work in the New York City area.'
    #     )
    # illinois = Ticket(
    #     price = "Illinois",
    #     description= 'Illinois is a hub for rail transportation in the Midwest, with Amtrak\'s high-speed Acela Express and several commuter rail lines serving the Chicago area.'
    # )
    # texas = Ticket(
    #     price = "Texas",
    #     description = 'Illinois is a hub for rail transportation in the Midwest, with Amtrak\'s high-speed Acela Express and several commuter rail lines serving the Chicago area.'
    # )
    # washington = Ticket(
    #     price = "Washington",
    #     description = 'With its scenic views and extensive rail network, Washington is a popular destination for train travel. Amtrak\'s Cascades line and Sound Transit\'s commuter rail system are particularly popular.'
    # )
