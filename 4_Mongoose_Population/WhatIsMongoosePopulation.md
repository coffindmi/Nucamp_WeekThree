*************************************************

                    EXAMPLE

var commentSchema = new Schema({
    rating: {type: Number, min: 1, max: 5, required: true},
    comment: {type: String, required: true},
    // instead of being type: String **********
    author: {
        // this means that the author field will contain an //objectID, which is a reference to user document
        // How is references the user document?
        // line(14)
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})


                What is Mongoose Population?

    - Is the process of automatically replacing specified paths withing a document with documents from another collection
    - Only use if you really need that information


                How To Use This Module
    
    Dishes.find({})
    //the parameters takes the specific field that needs to be //populated
    .populate('comments.author')












*************************************************