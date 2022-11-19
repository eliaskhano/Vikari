from django.shortcuts import render, HttpResponse 



# return list of errors 
def format_error(error):
    return list(map(lambda i: f"{', '.join(i[1])} ({i[0]})", error.items()))


# Boolean, list, object
def responsedata(status, message, data=None):
    if status:
        return {
            "status": status,
            "message": message,
            "data": data
        }
    else:
        return {
            "status": status,
            "message": message,
        }

        

def Index(request):
    return HttpResponse("Index")