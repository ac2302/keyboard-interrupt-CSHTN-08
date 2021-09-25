import discord
import os
from dotenv import load_dotenv
from discord.ext import commands
import requests

client = commands.Bot(command_prefix='$')
load_dotenv()
TOKEN = os.getenv('TOKEN')


def getProg(username):
    response = requests.get(
        f'http://localhost:3030/user/progress/by-username/{username}')
    module = response.json()['currentModule'] + 1
    lecture = response.json()['lastLesson'] + 2
    return f"```module {module}, video {lecture}```"


@client.event
async def on_ready():
    print('bot is ready')


@client.command()
async def progress(ctx, arg):
    if str(ctx.channel) == 'general':
        try:
            prog = getProg(arg)
            await ctx.send(f"Profile: {arg}")
            await ctx.send(f"Progress: {prog}")
        except:
            await ctx.send(f"invalid user: {arg}")
    else:
        await ctx.send("Wrong channel")


client.run(TOKEN)
