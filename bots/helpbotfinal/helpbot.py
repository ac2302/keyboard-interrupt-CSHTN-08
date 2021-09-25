import discord
from discord.ext import commands
import os
from dotenv import load_dotenv
load_dotenv()
TOKEN = os.getenv('TOKEN')

client = commands.Bot(command_prefix='$')


@client.event
async def on_ready():
    print('bot is ready')


@client.command()
async def helpme(ctx):
    await ctx.send("We have the following bots here:")
    await ctx.send("1.Progress Tracker Bot")
    await ctx.send("Progress Tracker Bot tells you your progress in the course")
    await ctx.send("Use command $progress followed by username on website to check your progress")
    await ctx.send("2.Article Search Bot")
    await ctx.send("Article Search Bot searches the internet and gives you the required article")
    await ctx.send("""Use command "$sarticle" followed by the word/words which you want to search""")
    await ctx.send("3.Video Search Bot")
    await ctx.send("Video Search Bot searches the internet and gives you the required video matching your request")
    await ctx.send("""Use command "$svideo" followed by the word/words which you want to search""")


client.run(TOKEN)
