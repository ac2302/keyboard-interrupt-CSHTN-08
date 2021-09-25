import discord
import os
from discord.ext import commands
from dotenv import load_dotenv

client = commands.Bot(command_prefix='$')
load_dotenv()
TOKEN = os.getenv('TOKEN')


@client.event
async def on_ready():
    print('bot is ready')


@client.command()
async def svideo(ctx,*args):
    if(args):
        await ctx.send(f"https://www.youtube.com/results?search_query={'+'.join(args)}")


client.run(TOKEN)