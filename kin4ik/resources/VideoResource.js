const Video = require('../models/Video')
const AdminBro = require('admin-bro');
const fs = require('fs')
const Star = require('../models/Star')
module.exports = {
    resource: Video,
    options: {
        properties: {
            cover: {
                components: {
                    list: AdminBro.bundle('../components/coverlist'),
                    edit: AdminBro.bundle('../components/coverupload'),
                    show: AdminBro.bundle('../components/covershow')
                },
            },
            poster: {
                components: {
                    list: AdminBro.bundle('../components/posterlist'),
                    edit: AdminBro.bundle('../components/posterupload'),
                    show: AdminBro.bundle('../components/postershow')
                },
            },
            description: {
                type: 'richtext'
            },
            rating: {
                components: {
                    edit: AdminBro.bundle('../components/ratingedit')
                }
            }
        },
        actions: {
            edit: {
                isVisible: true,
                actionType: 'record',
                icon: 'icomoon-edit',
                label: 'Edit',
                handler: async (request, response, data) => {
                    const { record } = data
                    if (request.method === 'get') {
                        return { record: record.toJSON() }
                    }
                    if (request.method === 'post') {
                        await record.update(request.payload.record)
                        if (record.isValid()) {
                            return {
                                redirectUrl: data.h.recordActionUrl({
                                    resourceId: data.resource.id(), recordId: record.id(), actionName: 'show',
                                }),
                                record: record.toJSON(),
                            }
                        }
                        return { record: record.toJSON() }
                    }
                    return ''
                },
                before: async (request) => {
                    if (request.payload.record) {
                        if (request.payload.record.coverImg) {
                            const coverbase64Data = request.payload.record.coverImg.replace(/^data:([A-Za-z-+/]+);base64,/, "");
                            fs.writeFile(`public/upload/${request.payload.record.cover}`, coverbase64Data, 'base64', function (err) {
                                console.log(err)
                            })
                        }
                        if (request.payload.record.posterImg) {
                            const posterbase64Data = request.payload.record.posterImg.replace(/^data:([A-Za-z-+/]+);base64,/, "");
                            fs.writeFile(`public/upload/${request.payload.record.poster}`, posterbase64Data, 'base64', function (err) {
                                console.log(err)
                            })
                        }
                    }
                    return request
                },
                after: async (response, request, context) =>{
                    response.record.params.actors && response.record.params.actors.map(actor => {
                        Star.findById(actor, function(err, star) {
                            if (err) console.log(err)
                            const data = new Set(star.films)
                            data.add(star._id)
                            console.log(data)
                            star.films = Array.from(data)
                            star.save()
                        })
                    })
                    return response
                }
            },
        }

    },
}