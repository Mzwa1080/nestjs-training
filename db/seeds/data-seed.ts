import { EntityManager } from "typeorm";
import * as bcrypt from 'bcryptjs'
import { Users } from "../../src/users/user.entity";
import { faker } from "@faker-js/faker";
import {v4 as uuid4} from 'uuid'
import { Playlist } from "../../src/playlists/playlist.entity";



export const seedData = async (manager: EntityManager) : Promise<void> =>{

    await seedUser()
    await seedArtist()
    await seedPlayLists()

    async function seedUser() {
        const salt = await bcrypt.genSalt()
        const encyptedPassword = await bcrypt.hash('123456', salt)

        const user =  new Users();
        user.firstName = faker.person.firstName()
        user.lastName = faker.person.lastName()
        user.email = faker.internet.email()
        user.password = encyptedPassword;
        user.apiKey = uuid4()

        const playList = new Playlist()
        playList.name = faker.music.genre()
        playList.id = user.id

        await manager.getRepository(Users).save(user)
    }

    async function seedArtist() {
        const salt = await bcrypt.genSalt()
        const encyptedPassword = await bcrypt.hash('123456', salt)

        const user =  new Users();
        user.firstName = faker.person.firstName()
        user.lastName = faker.person.lastName()
        user.email = faker.internet.email()
        user.password = encyptedPassword;
        user.apiKey = uuid4()

        const playList = new Playlist()
        playList.name = faker.music.genre()
        playList.id = user.id

        await manager.getRepository(Users).save(user)
        await manager.getRepository(Playlist).save(playList)
    }

    async function seedPlayLists() {
        const salt = await bcrypt.genSalt()
        const encyptedPassword = await bcrypt.hash('123456', salt)

        const user =  new Users();
        user.firstName = faker.person.firstName()
        user.lastName = faker.person.lastName()
        user.email = faker.internet.email()
        user.password = encyptedPassword;
        user.apiKey = uuid4()

        const playList = new Playlist()
        playList.name = faker.music.genre()
        playList.id = user.id

        await manager.getRepository(Users).save(user)
        await manager.getRepository(Playlist).save(playList)
    }
}