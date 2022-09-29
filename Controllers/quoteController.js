const Quote = require('../Models/quote')

exports.create = (req,res,next)=>{
    const quote = new Quote({
        userId : req.body.userId,
        about : req.body.about,
        description : req.body.description,
        imageUrl : req.body.imageUrl,
        by : req.body.by
    });

    quote.save().then(()=>{
        console.log('Quote saved successfully')
        res.status(201).json({
            message:"Quote saved successfully"
        })
    }).catch((error)=>{
        res.status(400).json({
            error : error
        })
    })
};

exports.getAll = (req,res,next)=>{
    Quote.find({userId:req.body.userId}).then((quotes)=>{
        res.status(200).json(quotes)
    }).catch((error)=>{
        console.error(error);
        res.status(400).json({
            error: error
        })
    })
};

exports.getOne = (req,res,next)=>{
    Quote.findOne({
        userId:req.body.userId,
        _id: req.params.id
    }).then((quote)=>{
        res.status(200).json(quote)
    }).catch((error)=>{
        console.error(error);
        res.status(404).json({
            error: error
        })
    })
};

exports.upadte = (req,res,next)=>{
    const quote = new Quote({
        _id : req.params.id,
        userId : req.body.userId,
        about : req.body.about,
        description : req.body.description,
        imageUrl : req.body.imageUrl,
        by : req.body.by
    });

    Quote.findOneAndUpdate({
        userId:req.body.userId,
        _id: req.params.id
    },quote).then(()=>{
        res.status(201).json({
            message: "Quote Updated successfully"
        })
    }).catch((error)=>{
        res.status(404).json({
            error: error
        })
    })
};

exports.delete = (req,res,next)=>{
    Quote.findOneAndDelete({_id: req.params.id}).then(()=>{
        res.status(200).json({
            message: "Item successfully deleted"
        })
    }).catch((error)=>{
        res.status(404).json({
            error: error
        })
    })
};