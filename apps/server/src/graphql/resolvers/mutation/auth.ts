import User from "../../../models/user/index.js";
import { compare, hash } from "bcrypt";
import { GraphQLError } from "graphql";
import { Context } from "../../../types/index.js";
import { jwtHelper } from "../../../utils/jwtHelper.js";
import { IUser } from "../../../models/user/interface.js";
import { uploadImage } from "../../../utils/uploadImage.js";

type Login = { email: string; password: string };
type Register = { name: string; email: string; password: string };
type SocialLogin = { name: string; email: string; image: string; provider: string };
type Profile = { name: string; phone: string; image: string; address: string };

export const Auth = {
    login: async (parent: any, { email, password }: Login, { res }: Context) => {
        const user = await User.findOne({ email });
        if (!user?._id) throw new GraphQLError("User doesn't exist...!", { extensions: { code: "BAD_REQUEST" } });
        if (!user?.password || !(await compare(password, user.password)))
            throw new GraphQLError("Password doesn't match...!", { extensions: { code: "BAD_REQUEST" } });

        return jwtHelper.encodeToken(user);
    },
    register: async (parent: any, { name, email, password }: Register, { res }: Context) => {
        const user = await User.findOne({ email });
        if (user?._id) throw new GraphQLError("User already exist...!", { extensions: { code: "BAD_REQUEST" } });

        const newUser = new User({ name, email, password: await hash(password, 12) });
        const newUserData = await newUser.save();

        return jwtHelper.encodeToken(newUserData);
    },
    socialLogin: async (parent: any, { name, email, image, provider }: SocialLogin, { res }: Context) => {
        let user: IUser;
        const isExist = await User.findOne({ email });

        if (isExist) {
            user = isExist;
        } else {
            const newUser = new User({ name, email, image, provider, isVerify: true });
            user = await newUser.save();
        }

        return jwtHelper.encodeToken(user);
    },
    profile: async (parent: any, args: Profile, { token, res }: Context) => {
        if (args.image !== token.image) args.image = await uploadImage(args.image, "User");
        const user = await User.findByIdAndUpdate(token.id, args, { new: true });

        return jwtHelper.encodeToken(user);
    },
};
