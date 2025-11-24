const players = [
  {
    "id": "kenny_dalglish",
    "name": "Kenny Dalglish",
    "position": "FW",
    "club": "Liverpool / Celtic",
    "era": "1970s-1980s icon",
    "value": 15,
    "stats": {
      "goals": 30,
      "assists": 18,
      "caps": 102
    },
    "photoUrl": "https://www.scottishfa.co.uk/media/6876/1-dalglish-1.jpg?mode=max&width=787&format=webp",
    "bio": "Scotland's most capped outfield player and Liverpool's greatest ever striker."
  },
  {
    "id": "denis_law",
    "name": "Denis Law",
    "position": "FW",
    "club": "Manchester United",
    "era": "1960s-1970s legend",
    "value": 14.7,
    "stats": {
      "goals": 30,
      "assists": 18,
      "caps": 55
    },
    "photoUrl": "https://www.scottishfa.co.uk/media/6874/2-law.jpg?mode=max&width=787&format=webp",
    "bio": "The Lawman - European Footballer of the Year and Manchester United legend."
  },
  {
    "id": "james_mcfadden",
    "name": "James McFadden",
    "position": "FW",
    "club": "Everton",
    "era": "2000s talisman",
    "value": 14.4,
    "stats": {
      "goals": 15,
      "assists": 9,
      "caps": 48
    },
    "photoUrl": "https://www.scottishfa.co.uk/media/6873/3-mcfadden.jpg?mode=max&width=787&format=webp",
    "bio": "Scored one of Scotland's greatest ever goals against France in 2007."
  },
  {
    "id": "jim_baxter",
    "name": "Jim Baxter",
    "position": "MF",
    "club": "Rangers",
    "era": "1960s genius",
    "value": 14.1,
    "stats": {
      "goals": 3,
      "assists": 2,
      "caps": 34
    },
    "photoUrl": "https://www.scottishfa.co.uk/media/6872/4-baxter.jpg?mode=max&width=787&format=webp",
    "bio": "Slim Jim - the most naturally gifted Scottish footballer of his generation."
  },
  {
    "id": "ally_mccoist",
    "name": "Ally McCoist",
    "position": "FW",
    "club": "Rangers",
    "era": "1980s-1990s Golden Boot",
    "value": 13.8,
    "stats": {
      "goals": 19,
      "assists": 11,
      "caps": 61
    },
    "photoUrl": "https://www.scottishfa.co.uk/media/6871/5-mccoist.jpg?mode=max&width=787&format=webp",
    "bio": "Rangers' all-time top scorer with 355 goals and Scotland's record goalscorer."
  },
  {
    "id": "davie_cooper",
    "name": "Davie Cooper",
    "position": "MF",
    "club": "Rangers",
    "era": "1970s-1980s winger",
    "value": 13.5,
    "stats": {
      "goals": 6,
      "assists": 4,
      "caps": 22
    },
    "photoUrl": "https://www.scottishfa.co.uk/media/6870/6-cooper.jpg?mode=max&width=787&format=webp",
    "bio": "The Coop - magical winger whose skill and flair lit up Ibrox for over a decade."
  },
  {
    "id": "billy_bremner",
    "name": "Billy Bremner",
    "position": "MF",
    "club": "Leeds United",
    "era": "1960s-1970s captain",
    "value": 13.2,
    "stats": {
      "goals": 3,
      "assists": 2,
      "caps": 54
    },
    "photoUrl": "https://www.scottishfa.co.uk/media/6869/7-bremner.jpg?mode=max&width=787&format=webp",
    "bio": "Leeds United's inspirational captain who led them to multiple league titles."
  },
  {
    "id": "graeme_souness",
    "name": "Graeme Souness",
    "position": "MF",
    "club": "Liverpool",
    "era": "1970s-1980s midfield general",
    "value": 12.9,
    "stats": {
      "goals": 4,
      "assists": 2,
      "caps": 54
    },
    "photoUrl": "https://www.scottishfa.co.uk/media/6868/8-souness.jpg?mode=max&width=787&format=webp",
    "bio": "Tough-tackling midfielder who won three European Cups with Liverpool."
  },
  {
    "id": "archie_gemmill",
    "name": "Archie Gemmill",
    "position": "MF",
    "club": "Derby County",
    "era": "1970s World Cup hero",
    "value": 12.6,
    "stats": {
      "goals": 8,
      "assists": 5,
      "caps": 43
    },
    "photoUrl": "https://www.scottishfa.co.uk/media/6867/9-a-gemmill.jpg?mode=max&width=787&format=webp",
    "bio": "Scored Scotland's greatest World Cup goal in the 3-2 win over Netherlands in 1978."
  },
  {
    "id": "joe_jordan",
    "name": "Joe Jordan",
    "position": "FW",
    "club": "Leeds United",
    "era": "1970s-1980s striker",
    "value": 12.3,
    "stats": {
      "goals": 11,
      "assists": 7,
      "caps": 52
    },
    "photoUrl": "https://www.scottishfa.co.uk/media/6866/10-jordan.jpg?mode=max&width=787&format=webp",
    "bio": "Jaws - powerful striker who terrorized defenses for Leeds and Scotland."
  },
  {
    "id": "darren_fletcher",
    "name": "Darren Fletcher",
    "position": "MF",
    "club": "Manchester United",
    "era": "2000s Premier League",
    "value": 12,
    "stats": {
      "goals": 5,
      "assists": 3,
      "caps": 80
    },
    "photoUrl": "https://www.scottishfa.co.uk/media/6865/11-d-fletcher.jpg?mode=max&width=787&format=webp",
    "bio": "Versatile midfielder who won multiple Premier League titles with Manchester United."
  },
  {
    "id": "scott_brown",
    "name": "Scott Brown",
    "position": "MF",
    "club": "Celtic",
    "era": "2010s captain",
    "value": 11.7,
    "stats": {
      "goals": 4,
      "assists": 2,
      "caps": 55
    },
    "photoUrl": "https://www.scottishfa.co.uk/media/6864/12-brown.jpg?mode=max&width=787&format=webp",
    "bio": "Celtic's tenacious captain who led the club to nine consecutive league titles."
  },
  {
    "id": "willie_miller",
    "name": "Willie Miller",
    "position": "DF",
    "club": "Aberdeen",
    "era": "1980s captain",
    "value": 11.4,
    "stats": {
      "goals": 0,
      "assists": 0,
      "caps": 65
    },
    "photoUrl": "https://www.scottishfa.co.uk/media/6863/13-w-miller.jpg?mode=max&width=787&format=webp",
    "bio": "Aberdeen's legendary captain who led them to European Cup Winners' Cup glory."
  },
  {
    "id": "jim_leighton",
    "name": "Jim Leighton",
    "position": "GK",
    "club": "Aberdeen / Manchester United",
    "era": "1980s-1990s keeper",
    "value": 11.1,
    "stats": {
      "goals": 0,
      "assists": 0,
      "caps": 91
    },
    "photoUrl": "https://www.scottishfa.co.uk/media/6862/14-leighton.jpg?mode=max&width=787&format=webp",
    "bio": "Scotland's most capped goalkeeper with 91 appearances between the posts."
  },
  {
    "id": "jimmy_johnstone",
    "name": "Jimmy Johnstone",
    "position": "MF",
    "club": "Celtic",
    "era": "1960s-1970s winger",
    "value": 10.8,
    "stats": {
      "goals": 4,
      "assists": 2,
      "caps": 23
    },
    "photoUrl": "https://www.scottishfa.co.uk/media/6861/15-johnstone.jpg?mode=max&width=787&format=webp",
    "bio": "Jinky - the Lisbon Lion whose dribbling skills mesmerized defenders."
  },
  {
    "id": "julie_fleeting",
    "name": "Julie Fleeting",
    "position": "FW",
    "club": "Scotland",
    "era": "30s legend",
    "value": 10.5,
    "stats": {
      "goals": 116,
      "assists": 70,
      "caps": 121
    },
    "photoUrl": "https://www.scottishfa.co.uk/media/6860/16-fleeting.jpg?mode=max&width=787&format=webp",
    "bio": "Scotland women's all-time top scorer with 116 goals in 121 caps."
  },
  {
    "id": "danny_mcgrain",
    "name": "Danny McGrain",
    "position": "DF",
    "club": "Celtic",
    "era": "1970s-1980s full-back",
    "value": 10.2,
    "stats": {
      "goals": 0,
      "assists": 0,
      "caps": 62
    },
    "photoUrl": "https://www.scottishfa.co.uk/media/6859/17-mcgrain.jpg?mode=max&width=787&format=webp",
    "bio": "Celtic's legendary full-back who overcame diabetes to become a club icon."
  },
  {
    "id": "john_collins",
    "name": "John Collins",
    "position": "MF",
    "club": "Celtic / Monaco",
    "era": "1990s technician",
    "value": 9.9,
    "stats": {
      "goals": 12,
      "assists": 7,
      "caps": 58
    },
    "photoUrl": "https://www.scottishfa.co.uk/media/6858/18-collins.jpg?mode=max&width=787&format=webp",
    "bio": "Elegant midfielder who won the French league title with Monaco."
  },
  {
    "id": "colin_hendry",
    "name": "Colin Hendry",
    "position": "DF",
    "club": "Blackburn Rovers",
    "era": "1990s captain",
    "value": 9.6,
    "stats": {
      "goals": 3,
      "assists": 2,
      "caps": 51
    },
    "photoUrl": "https://www.scottishfa.co.uk/media/6857/19-hendry.jpg?mode=max&width=787&format=webp",
    "bio": "Braveheart - commanding center-back who led Scotland to Euro 96 and World Cup 98."
  },
  {
    "id": "barry_ferguson",
    "name": "Barry Ferguson",
    "position": "MF",
    "club": "Rangers",
    "era": "2000s creator",
    "value": 9.3,
    "stats": {
      "goals": 3,
      "assists": 2,
      "caps": 45
    },
    "photoUrl": "https://www.scottishfa.co.uk/media/6856/20-b-ferguson.jpg?mode=max&width=787&format=webp",
    "bio": "Rangers' creative midfielder and captain who won multiple domestic trebles."
  },
  {
    "id": "kim_little",
    "name": "Kim Little",
    "position": "MF",
    "club": "Scotland",
    "era": "30s legend",
    "value": 9,
    "stats": {
      "goals": 59,
      "assists": 35,
      "caps": 140
    },
    "photoUrl": "https://www.scottishfa.co.uk/media/6855/21-little.jpg?mode=max&width=787&format=webp",
    "bio": "Scotland women's most capped player and Arsenal's midfield maestro."
  },
  {
    "id": "paul_mcstay",
    "name": "Paul Mcstay",
    "position": "MF",
    "club": "Celtic",
    "era": "1980s-1990s playmaker",
    "value": 8.7,
    "stats": {
      "goals": 9,
      "assists": 5,
      "caps": 76
    },
    "photoUrl": "https://www.scottishfa.co.uk/media/6854/22-mcstay.jpg?mode=max&width=787&format=webp",
    "bio": "Celtic's one-club man who spent his entire career at Parkhead as playmaker."
  },
  {
    "id": "alex_mcleish",
    "name": "Alex McLeish",
    "position": "DF",
    "club": "Aberdeen",
    "era": "1980s granite back",
    "value": 8.4,
    "stats": {
      "goals": 0,
      "assists": 0,
      "caps": 77
    },
    "photoUrl": "https://www.scottishfa.co.uk/media/6853/23-mcleish.jpg?mode=max&width=787&format=webp",
    "bio": "Big Eck - Aberdeen's granite defender who won European trophies under Fergie."
  },
  {
    "id": "andy_goram",
    "name": "Andy Goram",
    "position": "GK",
    "club": "Rangers",
    "era": "1990s legend",
    "value": 8.1,
    "stats": {
      "goals": 0,
      "assists": 0,
      "caps": 43
    },
    "photoUrl": "https://www.scottishfa.co.uk/media/6852/24-goram.jpg?mode=max&width=787&format=webp",
    "bio": "The Goalie - Rangers' legendary keeper who won nine league titles in a row."
  },
  {
    "id": "andy_robertson",
    "name": "Andy Robertson",
    "position": "DF",
    "club": "Liverpool",
    "era": "2010s Champions League winner",
    "value": 7.8,
    "stats": {
      "goals": 4,
      "assists": 2,
      "caps": 82
    },
    "photoUrl": "https://www.scottishfa.co.uk/media/6846/25-a-robertson.jpg?mode=max&width=787&format=webp",
    "bio": "Scotland's current captain and Liverpool's Champions League-winning left-back."
  },
  {
    "id": "kenny_miller",
    "name": "Kenny Miller",
    "position": "FW",
    "club": "Rangers",
    "era": "2000s-2010s striker",
    "value": 7.5,
    "stats": {
      "goals": 18,
      "assists": 11,
      "caps": 69
    },
    "photoUrl": "https://www.scottishfa.co.uk/media/6845/26-k-miller.jpg?mode=max&width=787&format=webp",
    "bio": "Prolific striker who scored goals for Rangers, Celtic, and Scotland."
  },
  {
    "id": "erin_cuthbert",
    "name": "Erin Cuthbert",
    "position": "MF",
    "club": "Scotland",
    "era": "20s legend",
    "value": 7.2,
    "stats": {
      "goals": 23,
      "assists": 14,
      "caps": 74
    },
    "photoUrl": "https://www.scottishfa.co.uk/media/6844/27-cuthbert.jpg?mode=max&width=787&format=webp",
    "bio": "Dynamic midfielder who helped Scotland qualify for their first Women's World Cup."
  },
  {
    "id": "gordon_strachan",
    "name": "Gordon Strachan",
    "position": "MF",
    "club": "Aberdeen / Manchester United",
    "era": "1980s energiser",
    "value": 6.9,
    "stats": {
      "goals": 5,
      "assists": 3,
      "caps": 50
    },
    "photoUrl": "https://www.scottishfa.co.uk/media/6843/28-strachan.jpg?mode=max&width=787&format=webp",
    "bio": "Wee Gordon - Aberdeen's energetic winger who won European Cup Winners' Cup."
  },
  {
    "id": "richard_gough",
    "name": "Richard Gough",
    "position": "DF",
    "club": "Tottenham Hotspur / Rangers",
    "era": "1990s defensive leader",
    "value": 6.6,
    "stats": {
      "goals": 6,
      "assists": 4,
      "caps": 61
    },
    "photoUrl": "https://www.scottishfa.co.uk/media/6847/29-gough.jpg?mode=max&width=787&format=webp",
    "bio": "Rangers' defensive rock who captained the club to nine-in-a-row success."
  },
  {
    "id": "christian_dailly",
    "name": "Christian Dailly",
    "position": "DF",
    "club": "Dundee United / West Ham",
    "era": "1990s-2000s utility",
    "value": 6.3,
    "stats": {
      "goals": 6,
      "assists": 4,
      "caps": 67
    },
    "photoUrl": "https://www.scottishfa.co.uk/media/6841/30-dailly.jpg?mode=max&width=787&format=webp",
    "bio": "Versatile defender who could play anywhere across the backline and midfield."
  },
  {
    "id": "roy_aitken",
    "name": "Roy Aitken",
    "position": "DF",
    "club": "Celtic",
    "era": "1980s-1990s leader",
    "value": 6,
    "stats": {
      "goals": 0,
      "assists": 0,
      "caps": 57
    },
    "photoUrl": "https://www.scottishfa.co.uk/media/6840/31-aitken.jpg?mode=max&width=787&format=webp",
    "bio": "The Bear - Celtic's inspirational captain and defensive stalwart."
  },
  {
    "id": "billy_mcneill",
    "name": "Billy McNeill",
    "position": "DF",
    "club": "Celtic",
    "era": "1960s-1970s captain",
    "value": 5.7,
    "stats": {
      "goals": 3,
      "assists": 2,
      "caps": 29
    },
    "photoUrl": "https://www.scottishfa.co.uk/media/6839/32-mcneill.jpg?mode=max&width=787&format=webp",
    "bio": "Caesar - Celtic's greatest captain who lifted the European Cup in 1967."
  },
  {
    "id": "craig_gordon",
    "name": "Craig Gordon",
    "position": "GK",
    "club": "Hearts / Celtic",
    "era": "2000s-2020s ever-present",
    "value": 5.4,
    "stats": {
      "goals": 0,
      "assists": 0,
      "caps": 81
    },
    "photoUrl": "https://www.scottishfa.co.uk/media/6838/33-gordon.jpg?mode=max&width=787&format=webp",
    "bio": "Hearts and Celtic's reliable goalkeeper with over 80 international caps."
  },
  {
    "id": "rachel_corsie",
    "name": "Rachel Corsie",
    "position": "DF",
    "club": "Scotland",
    "era": "10s legend",
    "value": 5.1,
    "stats": {
      "goals": 20,
      "assists": 12,
      "caps": 154
    },
    "photoUrl": "https://www.scottishfa.co.uk/media/6837/34-corsie.jpg?mode=max&width=787&format=webp",
    "bio": "Scotland women's captain and defensive leader with over 150 caps."
  },
  {
    "id": "gary_mcallister",
    "name": "Gary Mcallister",
    "position": "MF",
    "club": "Leeds United / Liverpool",
    "era": "1990s playmaker",
    "value": 4.5,
    "stats": {
      "goals": 5,
      "assists": 3,
      "caps": 57
    },
    "photoUrl": "https://www.scottishfa.co.uk/media/6835/36-mcallister.jpg?mode=max&width=787&format=webp",
    "bio": "Elegant playmaker who won the UEFA Cup with Liverpool at age 36."
  },
  {
    "id": "tom_boyd",
    "name": "Tom Boyd",
    "position": "DF",
    "club": "Celtic",
    "era": "1990s-2000s defender",
    "value": 4.5,
    "stats": {
      "goals": 0,
      "assists": 0,
      "caps": 72
    },
    "photoUrl": "https://www.scottishfa.co.uk/media/6836/35-boyd.jpg?mode=max&width=787&format=webp",
    "bio": "Celtic's consistent left-back who won multiple league titles and cups."
  },
  {
    "id": "david_narey",
    "name": "David Narey",
    "position": "DF",
    "club": "Dundee United",
    "era": "1980s defender",
    "value": 4.2,
    "stats": {
      "goals": 0,
      "assists": 0,
      "caps": 35
    },
    "photoUrl": "https://www.scottishfa.co.uk/media/6834/37-narey.jpg?mode=max&width=787&format=webp",
    "bio": "Dundee United's one-club man who scored Scotland's first goal at World Cup 82."
  },
  {
    "id": "john_mcginn",
    "name": "John McGinn",
    "position": "MF",
    "club": "Aston Villa",
    "era": "10s legend",
    "value": 3.9,
    "stats": {
      "goals": 20,
      "assists": 12,
      "caps": 75
    },
    "photoUrl": "https://www.scottishfa.co.uk/media/6833/38-mcginn.jpg?mode=max&width=787&format=webp",
    "bio": "Scotland's current midfield dynamo who helped end the 23-year major tournament drought."
  },
  {
    "id": "john_greig",
    "name": "John Greig",
    "position": "DF",
    "club": "Rangers",
    "era": "1960s-1970s captain",
    "value": 3.6,
    "stats": {
      "goals": 3,
      "assists": 2,
      "caps": 44
    },
    "photoUrl": "https://www.scottishfa.co.uk/media/6830/40-greig.jpg?mode=max&width=787&format=webp",
    "bio": "Rangers' greatest ever player who captained the club to European Cup Winners' Cup."
  },
  {
    "id": "jen_beattie",
    "name": "Jen Beattie",
    "position": "DF",
    "club": "Scotland",
    "era": "10s legend",
    "value": 3.3,
    "stats": {
      "goals": 24,
      "assists": 14,
      "caps": 144
    },
    "photoUrl": "https://www.scottishfa.co.uk/media/6832/40-beattie.jpg?mode=max&width=787&format=webp",
    "bio": "Arsenal and Scotland's commanding center-back with over 140 international caps."
  },
  {
    "id": "gemma_fay",
    "name": "Gemma Fay",
    "position": "GK",
    "club": "Scotland",
    "era": "10s legend",
    "value": 3,
    "stats": {
      "goals": 0,
      "assists": 0,
      "caps": 203
    },
    "photoUrl": "https://www.scottishfa.co.uk/media/6831/41-fay.jpg?mode=max&width=787&format=webp",
    "bio": "Scotland women's most capped player with over 200 appearances in goal."
  },
  {
    "id": "steve_archibald",
    "name": "Steve Archibald",
    "position": "FW",
    "club": "Tottenham Hotspur / Barcelona",
    "era": "1980s Euro star",
    "value": 2.7,
    "stats": {
      "goals": 4,
      "assists": 2,
      "caps": 27
    },
    "photoUrl": "https://www.scottishfa.co.uk/media/6829/42-archibald.jpg?mode=max&width=787&format=webp",
    "bio": "Tottenham's European hero who also won La Liga with Barcelona."
  },
  {
    "id": "lawrie_reilly",
    "name": "Lawrie Reilly",
    "position": "FW",
    "club": "Scotland",
    "era": "0s legend",
    "value": 2.4,
    "stats": {
      "goals": 22,
      "assists": 13,
      "caps": 38
    },
    "photoUrl": "https://www.scottishfa.co.uk/media/6828/43-reilly.jpg?mode=max&width=787&format=webp",
    "bio": "Hibs' legendary striker who scored 22 goals in just 38 Scotland appearances."
  },
  {
    "id": "hughie_gallacher",
    "name": "Hughie Gallacher",
    "position": "FW",
    "club": "Scotland",
    "era": "0s legend",
    "value": 2.1,
    "stats": {
      "goals": 24,
      "assists": 14,
      "caps": 20
    },
    "photoUrl": "https://www.scottishfa.co.uk/media/6827/44-gallacher.jpg?mode=max&width=787&format=webp",
    "bio": "Wembley Wizard who scored 24 goals in 20 caps during the 1920s."
  },
  {
    "id": "allan_mcgregor",
    "name": "Allan McGregor",
    "position": "GK",
    "club": "Rangers",
    "era": "2000s-2020s stalwart",
    "value": 1.8,
    "stats": {
      "goals": 0,
      "assists": 0,
      "caps": 42
    },
    "photoUrl": "https://www.scottishfa.co.uk/media/6826/45-a-mcgregor.jpg?mode=max&width=787&format=webp",
    "bio": "Rangers' reliable goalkeeper who won multiple league titles and cups."
  },
  {
    "id": "dave_mackay",
    "name": "Dave Mackay",
    "position": "DF",
    "club": "Tottenham Hotspur",
    "era": "1950s-1960s legend",
    "value": 1.5,
    "stats": {
      "goals": 4,
      "assists": 2,
      "caps": 22
    },
    "photoUrl": "https://www.scottishfa.co.uk/media/6825/46-mackay.jpg?mode=max&width=787&format=webp",
    "bio": "Tottenham's double-winning captain and one of Scotland's greatest defenders."
  },
  {
    "id": "paul_lambert",
    "name": "Paul Lambert",
    "position": "MF",
    "club": "Borussia Dortmund / Celtic",
    "era": "1990s Champions League winner",
    "value": 1.2,
    "stats": {
      "goals": 0,
      "assists": 0,
      "caps": 40
    },
    "photoUrl": "https://www.scottishfa.co.uk/media/6824/47-lambert.jpg?mode=max&width=787&format=webp",
    "bio": "First British player to win the Champions League with a foreign club (Dortmund)."
  },
  {
    "id": "mo_johnston",
    "name": "Mo Johnston",
    "position": "FW",
    "club": "Nantes / Rangers",
    "era": "1980s-1990s goal threat",
    "value": 0.9,
    "stats": {
      "goals": 14,
      "assists": 8,
      "caps": 38
    },
    "photoUrl": "https://www.scottishfa.co.uk/media/6823/48-johnston.jpg?mode=max&width=787&format=webp",
    "bio": "Controversial striker who scored goals for Celtic, Rangers, and Nantes."
  },
  {
    "id": "maurice_malpas",
    "name": "Maurice Malpas",
    "position": "DF",
    "club": "Dundee United",
    "era": "1980s-1990s full-back",
    "value": 0.6,
    "stats": {
      "goals": 0,
      "assists": 0,
      "caps": 55
    },
    "photoUrl": "https://www.scottishfa.co.uk/media/6822/49-malpas.jpg?mode=max&width=787&format=webp",
    "bio": "Dundee United's consistent full-back who won the Premier League title."
  },
  {
    "id": "alan_hansen",
    "name": "Alan Hansen",
    "position": "DF",
    "club": "Liverpool",
    "era": "1980s elegance",
    "value": 0.3,
    "stats": {
      "goals": 0,
      "assists": 0,
      "caps": 26
    },
    "photoUrl": "https://www.scottishfa.co.uk/media/6821/50-hansen.jpg?mode=max&width=787&format=webp",
    "bio": "Liverpool's elegant defender who won eight league titles and three European Cups."
  }
];

module.exports = players;
