import discord
import os
from dotenv import load_dotenv
from discord.ext import commands

client = commands.Bot(command_prefix='$')
load_dotenv()
TOKEN = os.getenv('TOKEN')


@client.event
async def on_ready():
    print('bot is ready')


@client.command()
async def progress(ctx, arg):
    if str(ctx.channel) == 'general':
        await ctx.send(f"Profile:{arg}")
        await ctx.send("Progress:")
    else:
        await ctx.send("Wrong channel")


client.run(TOKEN)
