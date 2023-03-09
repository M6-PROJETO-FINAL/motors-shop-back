import { AppDataSource } from "./../../data-source";
import { User } from "../../entities/user.entity";
import { sendEmail } from "../../utils/sendEmail.util";
import { AppError } from "../../errors/appError";
import { IEmailRequest } from "../../interfaces/session";

const sendResetPasswordService = async (
  email: string,
  protocol: string,
  host: string
): Promise<void> => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOne({
    where: {
      email: email,
    },
  });

  if (!user) {
    throw new AppError("User not found");
  }

  const resetPasswordToken = (Math.random() + 1).toString(36).substring(2);

  await userRepository.update(
    {
      id: user.id,
    },
    {
      tokenResetPassword: resetPasswordToken,
    }
  );

  const emailResetData: IEmailRequest = {
    subject: "Recuperação de senha",
    text: `<h1>Ateração de senha solicitada pelo usuário</h1>
    <h3>Olá ${user.fullName}, recebemos seu peido de recuperação de senha. 
    Caso não tenha solicitado, favor desconsiderar esse email ou entre em contato com nossa equipe.
    Para seguir com sua solicitação clique no link a seguir: 
    ${protocol}://${host}/user/resetPassword/${resetPasswordToken}</h3>`,
    to: email,
  };

  await sendEmail(emailResetData);
};

export default sendResetPasswordService;
