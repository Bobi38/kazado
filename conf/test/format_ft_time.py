import time

print(f"Seconds since January 1, 1970: {time.ctime()} or {time.time():.2e} in scientific notation")
print(time.asctime(time.gmtime()))