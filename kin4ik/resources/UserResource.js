const User = require('../models/User')
const AdminBro = require('admin-bro');
const fs = require('fs')
module.exports = {
    resource: User,
    options: {
        properties: {
            avatar: {
                components: {
                    list: AdminBro.bundle('../components/avatarlist'),
                    edit: AdminBro.bundle('../components/avatarupload'),
                    show: AdminBro.bundle('../components/avatarshow')
                },
            },
            password: {
                isVisible: {
                    edit: false, filter: false, show: false, list: false
                }
            },

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
                        if (request.payload.record.avatarImg) {
                            var base64Data = request.payload.record.avatarImg.replace(/^data:([A-Za-z-+/]+);base64,/, "");
                            fs.writeFile(`public/upload/${request.payload.record.avatar}`, base64Data, 'base64', function (err) {
                                console.log(err)
                            })
                        }
                    }
                    return request
                },
            },
        }

    },
}