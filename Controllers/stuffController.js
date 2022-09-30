const Thing = require("../Models/thing");

exports.create = (req, res, next) => {
    const thing = new Thing({
        title: req.body.title,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        price: req.body.price,
    });

    thing
        .save()
        .then(() => {
            console.log("Data saved successfully");
            res.status(201).json({
                message: "Data saved successfully",
            });
        })
        .catch((error) => {
            res.status(400).json({
                error: error,
            });
        });
};

exports.getAll = (req, res, next) => {
    Thing.find()
        .then((things) => {
            res.status(200).json(things);
        })
        .catch((error) => {
            console.error(error);
            res.status(400).json({
                error: error,
            });
        });
};

exports.getOne = (req, res, next) => {
    Thing.findOne({
        _id: req.params.id,
    })
        .then((thing) => {
            res.status(200).json(thing);
        })
        .catch((error) => {
            console.error(error);
            res.status(400).json({
                error: error,
            });
        });
};

exports.upadte = (req, res, next) => {
    const thing = new Thing({
        _id: req.params.id,
        title: req.body.title,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        price: req.body.price,
    });

    Thing.findOneAndUpdate(
        {
            _id: req.params.id,
        },
        thing
    )
        .then(() => {
            res.status(201).json({
                message: "Data Updated successfully",
            });
        })
        .catch((error) => {
            res.status(400).json({
                error: error,
            });
        });
};

exports.delete = (req, res, next) => {
    Thing.findOneAndDelete({ _id: req.params.id })
        .then(() => {
            res.status(200).json({
                message: "Item successfully deleted",
            });
        })
        .catch((error) => {
            res.status(400).json({
                error: error,
            });
        });
};
