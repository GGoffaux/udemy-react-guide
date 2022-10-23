import { Fragment } from "react";
import Head from "next/head";
import { MongoClient } from "mongodb";

import MeetupList from "../components/meetups/MeetupList";

function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta 
          name = 'description'
          content = 'Browse a huge list of highly active React meetups!'
        />
      </Head>
      <MeetupList meetups={props.meetups} />;
    </Fragment>
  );
}

// export async function getServerSideProps(context){
//     const req = context.req;
//     const res = context.res;
//     // fetch data from an API
//     return {
//         props: {
//             meetups: DUMMY_MEETUPS
//         }
//     };
// };

export async function getStaticProps() {
  // fetch data from an API
  const client = await MongoClient.connect(
    "mongodb+srv://ggoffaux:Equ!nox3s@cluster0.aysla.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 10,
  };
}

export default HomePage;

// import { useEffect, useState } from "react";
// import MeetupList from "../components/meetups/MeetupList";

// const DUMMY_MEETUPS = [
//   {
//     id: "m1",
//     title: "A first Meetup",
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/8/8f/070204_%2890%29_Mons.JPG",
//     address: "Some address 5, 12345 Some City",
//     description: "This is a first meetup!",
//   },
//   {
//     id: "m2",
//     title: "A second Meetup",
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/c/ca/Brugge-CanalRozenhoedkaai.JPG",
//     address: "Some address 15, 34512 Other City",
//     description: "This is a second meetup!",
//   },
// ];

// function HomePage() {
//   const [loadedMeetups, setLoadedMeetups] = useState([]);

//   useEffect(() => {
//     //send a http request and fetch data
//     setLoadedMeetups(DUMMY_MEETUPS);
//   }, []);

//   return <MeetupList meetups={loadedMeetups} />;
// }

// export default HomePage;
