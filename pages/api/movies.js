// api/movies.js
import { connectToDatabase } from '../../util/mongo'

export default async function handler(req,res) {
    // res.json({Hello: 'World'})

    const {db} = await connectToDatabase();

    const data = await db.collection("movies").find({}).limit(100).toArray();
    // console.log(data);

    res.json(data);
}