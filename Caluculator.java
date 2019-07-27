import java.util.InputMismatchException;
import java.util.Scanner;

public class Caluculator
{
    static Scanner scanner;

    public static void main(String args[])
    {
       try
       {
           scanner = new Scanner(System.in);
           double firstNum, secondNum, answer;

           System.out.println("Enter your first number: ");
           firstNum = scanner.nextDouble();

           System.out.println("Enter your second number: ");
           secondNum = scanner.nextDouble();

           answer = firstNum - secondNum;
           System.out.println(answer);
       }
       catch (InputMismatchException e)5
       {
           System.out.println("Invalid input");
       }
       finally
       {
           scanner.close();
       }

}}